import axios, { Axios } from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAction,deleteUserAction,makeAdminAction } from "../../redux/reducers/Admin/index";
import "./style.css"
const UserTable = () => {
  const state = useSelector((state) => {
    return {
      user: state.admin.users,
    };
  });
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5000/user")
      .then((result) => {
        dispatch(getUserAction(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/user/${id}`)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const makeAdmin = (id) => {
    axios
      .put(`http://localhost:5000/user/${id}`)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="userTablePage">
      <table>
        <tr className="headRow">
          <th className="head">User_id</th>
          <th className="head">Name</th>
          <th className="head">Email</th>
          <th className="head">Country</th>
          <th className="head">Role_Id</th>
          <th className="head">Is_Deleted</th>
          <th className="head">Operation</th>
        </tr>
        {state.user &&
          state.user.map((element, index) => {
            return (
              <tr key={index} className="rowBody">
                <td className="body">{`${element.user_id}`} </td>
                <td className="body">{element.name}</td>
                <td className="body">{element.email}</td>
                <td className="body">{element.country}</td>
                <td className="body">{element.role_id}</td>
                <td className="body">{element.is_deleted}</td>
                <td className="body">
                  <button className="operButton"
                    onClick={(e) => {
                      deleteUser(element.user_id);
                      dispatch(deleteUserAction(index))
                    }}
                  >
                    Delete
                  </button>
                  <button className="operButton"
                    onClick={(e) => {
                      makeAdmin(element.user_id);
                      dispatch(makeAdminAction(index))
                    }}
                  >
                    Make Admin
                  </button>
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};
export default UserTable;
