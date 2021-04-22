import React, { Component } from "react";
import ViewTask from "./ViewTask";
import Edit from "../images/edit-icon.png";
import Delete from "../images/delete-icon.png";
import moment from "moment";
import Sort from "../images/sort-icon.png";

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      data: "",
    };
  }

  showModal = (task) => {
    console.log(task);
    this.setState({ show: true, data: task });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    let tasks = this.props.taskList.map((task, index) => (
      <tr key={task.title}>
        <td onClick={() => this.showModal(task)}>
          <a href="javascript:void(0)">{task.summary}</a>
        </td>
        <td>{task.priority}</td>
        <td>{moment(task.createdOn).format("L")}</td>
        <td>{moment(task.dueDate).format("L")}</td>
        <td>
          <div>
            <img
              src={Edit}
              onClick={() => this.props.showEditModal(task, index)}
            />
            <img
              style={{ marginLeft: 8 + "px" }}
              src={Delete}
              onClick={() => this.props.delete(task.summary, task.status)}
            />
            <button
              style={{ marginLeft: 8 + "px" }}
              type="button"
              className="btn btn-primary"
              onClick={() => this.props.doneTask(index)}
            >
              {task.status === "Open" ? "Done" : "Re-Open"}
            </button>
          </div>
        </td>
      </tr>
    ));
    return (
      <div>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th onClick={(event) => this.props.sortFunc("summary")}>
                Summary
                <img src={Sort} />
              </th>
              <th onClick={(event) => this.props.sortFunc("priority")}>
                Priority <img src={Sort} />
              </th>

              <th>Created At</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{tasks}</tbody>
        </table>
        {this.state.show ? (
          <ViewTask data={this.state.data} hideModal={this.hideModal} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default TaskList;
