import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsersProfileImageAction,
  updateProfileAction,
  usersProfileAction,
} from "../stateManager/actions/UsersAction";
import { validatorSP } from "../utility/formValidator";
import { just_persian } from "../utility/inputValidators";
const centerStyle = {
  color: "white",
  position: "absolute",
  bottom: 0,
  right: "25%",
  width: "60px",
  textAlign: "center",
  fontSize: "18px",
};
const imageStyle = {
  width: "250px",
  height: "250px",
  borderRadius: 200,
};
const UsersProfileComponent = () => {
  const dispatch = useDispatch();
  const formValidatorProfile = useRef(validatorSP());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [, setReload] = useState();
  const userProfile = useSelector((state) => state.userProfile);

  useEffect(() => {
    setFirstName(userProfile.firstName);
    setLastName(userProfile.lastName);
    setEmail(userProfile.email);
    setPhoneNumber(userProfile.phoneNumber);
  }, [userProfile, isEditable]);

  const onUpdateProfileHandle = async () => {
    if (formValidatorProfile.current.allValid()) {
      await dispatch(
        updateProfileAction({
          firstName,
          lastName,
          email,
          phoneNumber,
        })
      );
      setIsEditable(false);
    } else {
      formValidatorProfile.current.showMessages();
      setReload(1);
    }
  };

  const setUsersProfileImage = async (files) => {
    const file = new FormData();
    file.append("file", files[0]);
    await dispatch(setUsersProfileImageAction(file));
  };
  return (
    <div className={"card card-body"}>
      <div className={"text-center mb-4"}>
        <div style={{ position: "relative" }}>
          <img
            src={
              userProfile.profileImage
                ? `http://localhost:5000/${userProfile._id}/${userProfile.profileImage}`
                : "./assets/images/profile.png"
            }
            style={imageStyle}
            alt="Cinque Terre"
            width="100"
            height="100"
          />
          <label
            htmlFor="input-url-profile"
            style={centerStyle}
            className={"custom-cursor"}
          >
            <div style={{ height: "3.0rem", width: "3.0rem" }}>
              <span className="avatar-title rounded-circle">
                <i className="mdi mdi-image-edit" style={{ fontSize: 20 }} />
              </span>
            </div>
          </label>
        </div>
        <div>
          <p
            className={"m-0 custom-cursor"}
            style={{ color: "red" }}
            onClick={() => {
              window.$("#resetPasswordDialog").modal("show");
            }}
          >
            ویرایش کلمه عبور
          </p>
          {!isEditable ? (
            <div>
              <p
                className={"m-0 custom-cursor"}
                style={{ color: "royalblue" }}
                onClick={() => {
                  setIsEditable(true);
                }}
              >
                ویرایش
              </p>
              {/*<p className={"m-0 custom-cursor"} style={{color:"red"}} onClick={()=>{
                                window.$('#resetPasswordDialog').modal('show')
                            }}>ویرایش کلمه عبور</p>*/}
            </div>
          ) : null}
        </div>
      </div>
      {isEditable ? (
        <>
          <div className={"row mx-2 col-lg-13"}>
            <p className={"mt-1 col-lg-4"}>نام : </p>
            <input
              value={firstName}
              onChange={(e) => {
                if (
                  just_persian(e.target.value) ||
                  e.target.value.length === 0
                ) {
                  formValidatorProfile.current.showMessageFor("firstName");
                  setFirstName(e.target.value);
                }
              }}
              className={"col-lg-8 form-control"}
            />
          </div>
          {formValidatorProfile.current.message(
            "firstName",
            firstName,
            "required|min:2|max:80"
          )}
          <div className={"row mx-2 col-lg-13"}>
            <p className={"mt-1 col-lg-4"}>نام خانوادگی : </p>
            <input
              className={"col-lg-8 form-control"}
              onChange={(e) => {
                if (
                  just_persian(e.target.value) ||
                  e.target.value.length === 0
                ) {
                  formValidatorProfile.current.showMessageFor("lastName");
                  setLastName(e.target.value);
                }
              }}
              value={lastName}
            />
          </div>
          {formValidatorProfile.current.message(
            "lastName",
            lastName,
            "required|min:2|max:80"
          )}
          <div className={"row mx-2 col-lg-13"}>
            <p className={"mt-1 col-lg-4"}>ایمیل : </p>
            <input
              className={"col-lg-8 form-control"}
              onChange={(e) => {
                formValidatorProfile.current.showMessageFor("email");
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          {formValidatorProfile.current.message(
            "email",
            email,
            "required|email"
          )}
          <div className={"row mx-2 col-lg-13"}>
            <p className={"mt-1 col-lg-4"}>شماره تماس : </p>
            <input
              type={"number"}
              className={"col-lg-8 form-control"}
              onChange={(e) => {
                if (e.target.value.length <= 11) {
                  formValidatorProfile.current.showMessageFor("phoneNumber");
                  setPhoneNumber(e.target.value);
                }
              }}
              value={phoneNumber}
            />
          </div>
          {formValidatorProfile.current.message(
            "phoneNumber",
            phoneNumber,
            "required|max:11|min:11"
          )}
        </>
      ) : (
        <>
          <div className={"row mx-2 col-lg-13"}>
            <p className={"mt-1 col-lg-4"}>نام : </p>
            <p>{firstName}</p>
          </div>
          <div className={"row mx-2 col-lg-13"}>
            <p className={"mt-1 col-lg-4"}>نام خانوادگی : </p>
            <p>{lastName}</p>
          </div>
          <div className={"row mx-2 col-lg-13"}>
            <p className={"mt-1 col-lg-4"}>ایمیل : </p>
            <p>{email}</p>
          </div>
          <div className={"row mx-2 col-lg-13"}>
            <p className={"mt-1 col-lg-4"}>شماره تماس : </p>
            <p>{phoneNumber}</p>
          </div>
        </>
      )}

      <div className={"row mx-2 col-lg-13"}>
        <p className={"mt-1 col-lg-4"}>نام کاربری : </p>
        <p>{userProfile.userName}</p>
      </div>
      <div className={"row mx-2 col-lg-13"}>
        <p className={"mt-1 col-lg-4"}>تاریخ ثبت : </p>
        <p>{userProfile.createDate}</p>
      </div>

      {isEditable ? (
        <div className={"row"}>
          <div className={"col-lg-8"}>
            <button
              className={"btn btn-success mb-4 btn-block"}
              onClick={onUpdateProfileHandle}
            >
              ثبت
            </button>
          </div>
          <div className={"col-lg-4"}>
            <button
              className={"btn btn-danger mb-4 btn-block"}
              onClick={() => {
                setIsEditable(false);
              }}
            >
              انصراف
            </button>
          </div>
        </div>
      ) : null}

      <input
        type="file"
        id="input-url-profile"
        multiple="multiple"
        name={"imageUrl"}
        onChange={(e) => {
          setUsersProfileImage(e.target.files);
        }}
        style={{ visibility: "hidden" }}
        aria-describedby="imageUrl"
      />
    </div>
  );
};
export default UsersProfileComponent;
