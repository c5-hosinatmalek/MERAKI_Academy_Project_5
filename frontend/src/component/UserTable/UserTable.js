import axios, { Axios } from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAction,deleteUserAction,makeAdminAction } from "../../redux/reducers/Admin/index";
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
    <>
      <table>
        <tr>
          <th>User_id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Country</th>
          <th>Role_Id</th>
          <th>Is_Deleted</th>
          <th>button</th>
        </tr>
        {state.user &&
          state.user.map((element, index) => {
            return (
              <tr key={index}>
                <td>{`${element.user_id}`} </td>
                <td>{element.name}</td>
                <td>{element.email}</td>
                <td>{element.country}</td>
                <td>{element.role_id}</td>
                <td>{element.is_deleted}</td>
                <td>
                  <button
                    onClick={(e) => {
                      deleteUser(element.user_id);
                      dispatch(deleteUserAction(index))
                    }}
                  >
                    Delete
                  </button>
                  <button
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
    </>
  );
};
export default UserTable;
