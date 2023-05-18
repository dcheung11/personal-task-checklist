import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Empty,
  Form,
  Input,
  List,
  Modal,
  Popconfirm,
  Row,
  Switch,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  createTask,
  deleteTaskById,
  getTasksbyUserId,
} from "../api/tasks/tasks";
import { TodoItem } from "../components/TaskItem";

const TaskPage = (props) => {
//   console.log(props);
  const [userTasks, setUserTasks] = useState([]);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [freq, setFreq] = useState("");

  useEffect(() => {
    let a = getTasks();

    // console.log(userTasks);
  }, []);

  const getTasks = async () => {
    let a = await getTasksbyUserId(props.user.id);
    // console.log(a);
    setUserTasks(a.tasks);
  };

  const deleteTask = async (a) => {
    let b = await deleteTaskById(a.id);
    // console.log(a);
    getTasks();
    // setUserTasks(a.tasks);
  };

  const handleAdd = () => {
    setNewTaskModal(true);
  };
  const onAdd = async () => {
    let b = await createTask(taskName, freq, props.user.id);
    // console.log(b);
    // console.log(taskName, freq);
    getTasks();
    setNewTaskModal(false);

  };
  const handleCancel = () => {
    setNewTaskModal(false);
  };
  return (
    <>
      <Modal
        // onOk={handleOk}
        onCancel={handleCancel}
        open={newTaskModal}
        footer={
          <Button onClick={onAdd} style={{ backgroundColor: "#1fad45" }}>
            Add Task
          </Button>
        }
      >
        <Typography.Text>
            Task Name
        </Typography.Text>
        <Input onChange={(e) => setTaskName(e.target.value)} />
        <Typography.Text>
            Task Frequency
        </Typography.Text>
        <Input onChange={(e) => setFreq(e.target.value)} />
      </Modal>
      <List
        style={{ backgroundColor: "#779dbd" }}
        size="small"
        header={
          <Typography.Title style={{ fontSize: "20px" }}>
            {props.user.name}'s Tasks
          </Typography.Title>
        }
        footer={
          <Button onClick={handleAdd} style={{ backgroundColor: "#1fad45" }}>
            Add
          </Button>
        }
        bordered
        dataSource={userTasks}
        locale={{
          emptyText: "There's nothing to do :(",
        }}
        // pagination={{
        //     position: 'bottom',
        //     pageSize: 10,
        //   }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Tooltip title="Toggle completion">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  //   onChange={() => onTodoToggle(todo)}
                  //   defaultChecked={todo.completed}
                />
              </Tooltip>,
              <Popconfirm
                title="Are you sure you want to delete?"
                onConfirm={() => {
                  deleteTask(item);
                }}
              >
                <Button className="remove-todo-button" type="primary" danger>
                  X
                </Button>
              </Popconfirm>,
            ]}
          >
            <div className="todo-item">
              <Tag color={true ? "green" : "red"} className="todo-tag">
                {item.name}
              </Tag>
              {item.frequency}
            </div>
          </List.Item>
        )}
      />
      {/* {userTasks.map((a) => (
        <Typography.Text> hi</Typography.Text>
      ))} */}
    </>
  );
};

export default TaskPage;
