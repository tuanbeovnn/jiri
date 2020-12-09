import React, {useEffect, useState} from 'react'; 
import { Table, Button, Space } from 'antd';
import ReactHtmlParser from 'react-html-parser';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import FormEditProject from '../../../components/Form/FormEditProject/FormEditProject';

export default function ProjectManagement(props) {
    const dispatch = useDispatch(); 
    
    //lấy dữ liệu từ reducer về component 
    const projectList = useSelector(state => state.ProjectCyberBugsReducer.projectList); 

    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });
    useEffect(()=>{
        dispatch({
            type: "GET_LIST_PROJECT_SAGA"
        }, [])
    })
   const handleChange = (pagination, filters, sorter) => {
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };
  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };
  let { sortedInfo, filteredInfo } = state;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        sorter: (item2, item1) => {
            return item2.id - item1.id; 
        },
        sortDirections: ['descend'], 
        ellipsis: true,
      },
      {
        title: 'projectName',
        dataIndex: 'projectName',
        key: 'projectName',
        sorter: (item2, item1) => {
           let projectName1 = item1.projectName?.trim().toLowerCase(); 
           let projectName2 = item2.projectName?.trim().toLowerCase(); 
           if(projectName2 < projectName1){
               return -1 
           } 
           return 1; 
        },
        sortDirections: ['descend'], 
        ellipsis: true,
      },
      {
        title: 'description',
        dataIndex: 'description',
        key: 'description',
        render: (text, record, index) => {
            let jsxContent = ReactHtmlParser(text); 
            return <div key= {index}>
                {jsxContent}
            </div> 
        },
        ellipsis: true,
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => {
          return <div>
          <Space size="middle">
               <EditOutlined style={{ color: '#08c' }}
               onClick = {()=>{
                 const action= {
                   type: "OPEN_FORM_EDIT_PROJECT",
                   Component : <FormEditProject/>,                   
                 }
                 //dispatch lên reducer nội dung drawer 
                 dispatch(action); 
                 const actionEditProject = {
                   type: "EDIT_PROJECT_SAGA_DRAWER", 
                   projectEditModal: record 
                 }
                 dispatch(actionEditProject)
               }}
                />
               <DeleteOutlined style={{ color: '#eb2f96' }}/>
            </Space>
          </div>

        },
        ellipsis: true,
      },
    ]  
    return (
        <div className="container-fluid mt-5">
         <h3> Project Management</h3>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={setAgeSort}>Sort age</Button>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
        </Space>
        <Table columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />
      </div>
    )
}
