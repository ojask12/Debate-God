import React, { Component } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

class Home extends Component {
  constructor(props) {
    super(props);
    this.myInterval = 1;
  }
  state = {
    statements1: [],
    statements: [
      {
        user: 0,
        type: "Lead",
        text: "Hi, i'm Isaac, i'm going to be writing about how this face on Mars is a natural landform or if there is life on Mars that made it. The story is about how NASA took a picture of Mars and a face was seen on the planet. NASA doesn't know if the landform was created by life on Mars, or if it is just a natural landform. ",
        form: "Adequate",
      },
      {
        user: 0,
        type: "Position",
        text: "On my perspective, I think that the face is a natural landform because I dont think that there is any life on Mars. In these next few paragraphs, I'll be talking about how I think that is is a natural landform ",
        form: "Adequate",
      },
      {
        user: 0,
        type: "Claim",
        text: "I think that the face is a natural landform because there is no life on Mars that we have descovered yet",
        form: "Adequate",
      },
      {
        user: 0,
        type: "Evidence",
        text: "If life was on Mars, we would know by now. The reason why I think it is a natural landform because, nobody live on Mars in order to create the figure. It says in paragraph 9, It's not easy to target Cydonia, in which he is saying that its not easy to know if it is a natural landform at this point. In all that they're saying, its probably a natural landform. ",
        form: "Adequate",
      },
      {
        user: 0,
        type: "Counter Claim",
        text: "People thought that the face was formed by alieans because they thought that there was life on Mars.",
        form: "Adequate",
      },
      {
        user: 0,
        type: "Rebuttal",
        text: "though some say that life on Mars does exist, I think that there is no life on Mars. ",
        form: "InEffective",
      },
      {
        user: 0,
        type: "Evidence",
        text: "It says in paragraph 7, on April 5, 1998, Mars Global Surveyor flew over Cydonia for the first time. Michael Malin took a picture of Mars with his Orbiter Camera, that the face was a natural landform.",
        form: "Adequate",
      },
      {
        user: 0,
        type: "Counter Claim",
        text: "Everyone who thought it was made by alieans even though it wasn't, was not satisfied. I think they were not satisfied because they have thought since 1976 that it was really formed by alieans.",
        form: "Adequate",
      },
      {
        user: 0,
        type: "Concluding Statement",
        text: "Though people were not satified about how the landform was a natural landform, in all, we new that alieans did not form the face. I would like to know how the landform was formed. we know now that life on Mars doesn't exist. ",
        form: "Adequate",
      },
    ],
    selectedType: "",
    letTalk: false,
    types: ["Lead", "Position", "Claim"],
    writtenText: "",
    finalwrittenText: "",
    writtenType: "",
    debateEnd: false,
    loader: false,
  };
  getDebate = async () => {
    let essay_id = 1;
    if (this.state.statements.length > 0) {
      essay_id = this.state.statements[0]["essay_id"];
    }
    await axios
      .get("http://127.0.0.1:5000/get-debate?essayid=" + essay_id)
      .then((res) => {
        this.setState({ statements: res.data.data });
        setTimeout(() => {
          let statements = this.state.statements1;
          statements.push(this.state.statements[statements.length]);
          this.setState({
            statements1: statements,
            letTalk: true,
            selectedType:
              this.state.statements[this.state.statements1.length].type,
          });
        }, 2000);
      })
      .catch((err) => console.log(err));
    // this.myInterval = setInterval(() => {
    //   let statements = this.state.statements1;
    //   statements.push(this.state.statements[statements.length]);
    //   this.setState({
    //     statements1: statements,
    //     letTalk: true,
    //     selectedType: this.state.statements[this.state.statements1.length].type,
    //   });
    //   clearInterval(this.myInterval);
    // }, 2000);
  };
  textWritten = async (text) => {
    this.setState({ finalwrittenText: text, loader: true });
    await axios
      .get("http://127.0.0.1:5000/check-statement?statement=" + text)
      .then((res) => {
        console.log(res);
        this.setState({
          writtenType: res.data.data,
          writtenText: "",
          loader: false,
        });
      })
      .catch((err) => console.log(err));
  };
  componentWillMount() {
    this.getDebate();
  }
  proceed = () => {
    this.setState({
      writtenText: "",
      finalwrittenText: "",
      writtenType: "",
      letTalk: false,
      selectedType: "",
    });
    let statements = this.state.statements1;
    statements.push(this.state.statements[statements.length]);
    this.setState({
      statements1: statements,
      letTalk: this.state.statements.length > statements.length ? true : false,
      selectedType:
        this.state.statements.length > statements.length
          ? this.state.statements[statements.length].type
          : "",
    });
    if (this.state.statements.length === statements.length) {
      this.setState({ debateEnd: true });
    }
  };
  proceedmine = () => {
    this.setState({
      writtenText: "",
      letTalk: false,
      selectedType: "",
    });
    let statements = this.state.statements1;
    statements.push({
      ...this.state.statements[statements.length],
      user: 1,
      text: this.state.finalwrittenText,
      form: this.state.writtenType,
    });
    this.setState({
      statements1: statements,
      letTalk: this.state.statements.length > statements.length ? true : false,
      finalwrittenText: "",
      writtenType: "",
      selectedType:
        this.state.statements.length > statements.length
          ? this.state.statements[statements.length].type
          : "",
    });
    if (this.state.statements.length === statements.length) {
      this.setState({ debateEnd: true });
    }
  };
  resetDebate = () => {
    this.setState(
      {
        statements1: [],
        writtenText: "",
        finalwrittenText: "",
        writtenType: "",
        letTalk: false,
        selectedType: "",
      },
      () => this.getDebate()
    );
  };
  render() {
    return (
      <div className="p-2" style={{ height: "90vh" }}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="h-100 w-40 p-4 border rounded overflow-auto">
            {this.state.statements1.map((statement) => (
              <div
                className={
                  "w-100 my-2 d-flex " +
                  (statement.user === 0
                    ? "justify-content-start"
                    : "justify-content-end")
                }
              >
                <div
                  className="p-3 border"
                  style={{
                    textAlign: statement.user === 0 ? "left" : "right",
                    maxWidth: "60%",
                    minWidth: "30%",
                    borderRadius: "15px",
                  }}
                >
                  <p className="fs-12 font-weight-bold m-0 mb-1">
                    {statement.type}
                  </p>
                  <p className="fs-16 m-0">{statement.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="h-100 w-60 px-4 py-1">
            <div className="h-100 d-flex flex-column justify-content-between overflow-auto p-1">
              <div>
                <div className="d-flex justify-content-around">
                  <div className="w-33">
                    <button
                      className="w-100 btn btn-warning"
                      onClick={this.proceed}
                      disabled={this.state.debateEnd}
                    >
                      Proceed (Given)
                    </button>
                  </div>
                  <div className="w-33">
                    <button
                      className="w-100 btn btn-success"
                      onClick={this.proceedmine}
                      disabled={
                        this.state.debateEnd ||
                        (this.state.finalwrittenText === "" &&
                          this.state.writtenType === "")
                      }
                    >
                      Proceed (Mine)
                    </button>
                  </div>
                  <div className="w-33">
                    <button
                      className="w-100 btn btn-primary"
                      onClick={this.resetDebate}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center my-1">
                <img
                  src="/whale1.jpg"
                  alt="happywhale"
                  style={{
                    borderRadius: "50%",
                    width: "300px",
                  }}
                />
              </div>
              {this.state.letTalk ? (
                !this.state.loader ? (
                  <div className="px-1 d-flex flex-column">
                    <div className="mb-2">
                      <h4>Your Role is: {this.state.selectedType}</h4>
                    </div>
                    {this.state.writtenType !== "" && (
                      <div className="w-90 mb-3 mx-auto">
                        <TableContainer
                          sx={{ minWidth: "100%" }}
                          component={Paper}
                        >
                          <Table
                            sx={{ minWidth: "100%" }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Text</TableCell>
                                <TableCell align="center">Prediction</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow
                                key={1}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="center">Given</TableCell>
                                <TableCell align="center">
                                  {
                                    this.state.statements[
                                      this.state.statements1.length
                                    ].text
                                  }
                                </TableCell>
                                <TableCell align="center">
                                  {
                                    this.state.statements[
                                      this.state.statements1.length
                                    ].form
                                  }
                                </TableCell>
                              </TableRow>
                              <TableRow
                                key={1}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="center">Yours</TableCell>
                                <TableCell align="center">
                                  {this.state.finalwrittenText}
                                </TableCell>
                                <TableCell align="center">
                                  {this.state.writtenType}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    )}
                    <div className="d-flex">
                      <div className="w-90">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Type your statement here ..."
                          value={this.state.writtenText}
                          onChange={(e) => {
                            this.setState({ writtenText: e.target.value });
                          }}
                          style={{
                            outline: "none",
                          }}
                          tabIndex="-1"
                        />
                      </div>
                      <div>
                        <button
                          className="btn btn-warning"
                          onClick={() =>
                            this.textWritten(this.state.writtenText)
                          }
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <CircularProgress
                      style={{
                        height: "100px",
                        width: "100px",
                      }}
                    />
                  </Box>
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
