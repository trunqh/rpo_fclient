import React from "react";
import { connect } from "react-redux";
import BackendService from "../services/BackendService";
import { userActions } from "../utils/Rdx";
import Utils from "../utils/Utils";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggingIn: false,
      submitted: false,
      //error_message: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true, loggingIn: true /*error_message: null*/ });
    const { username, password } = this.state;
    BackendService.login(username, password)
      .then((res) => {
        //Utils.saveUser(res.data);
        this.props.dispatch(userActions.login(res.data));
        this.props.history.push("/home");
      })
      .catch((err) => {
        // if (err.response && err.response.status === 401)
        //   this.setState({ error_message: "login failed", loggingIn: false });
        // else this.setState({ error_message: err.message, loggingIn: false });
        this.setState({ loggingIn: false });
      })
      .finally(() => {
        this.setState({ loggingIn: false });
      });
  }
  render() {
    let { submitted, username, password, loggingIn } = this.state;
    return (
      <div className="col-md-6 mr-0">
        {/* {this.state.error_message && (
          <div className="alert alert-danger mt-1 mr-0 ml-0">
            {this.state.error_message}
          </div>
        )} */}
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className={
                "form-control" + (submitted && !username ? "is-invalid" : "")
              }
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            {submitted && !username && (
              <div className="help-block text-danger">Username is required</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={
                "form-control" + (submitted && !password ? "is-invalid" : "")
              }
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            {submitted && !password && (
              <div className="help-block text-danger">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">
              {loggingIn && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Вход
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default connect()(Login);
