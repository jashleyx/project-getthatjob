import { useState, useEffect } from "react";
import axios from "axios";
import YourApplicationSideBar from "@/components/ProfessionalSideBar/YourApplicationSideBar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import cancelIcon from "../images/ApllicationApplyPage/cancel.svg";
import closedIcon from "../images/ApllicationApplyPage/closed.svg";
import letterIcon from "../images/ApllicationApplyPage/letter.svg";
import letterSentIcon from "../images/ApllicationApplyPage/letter-sent.svg";
import pendingIcon from "../images/ApllicationApplyPage/pending.svg";
import calendar from "../images/ApllicationApplyPage/calendar-lightgray.svg";
import category from "../images/ApllicationApplyPage/category.svg";
import dollarIcon from "../images/ApllicationApplyPage/dollar.svg";
import timeIcon from "../images/ApllicationApplyPage/time-lightgray.svg";
import declineIcon from "../images/ApllicationApplyPage/white-decline.svg";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useAuth } from "@/contexts/authentication";

moment().format();

function TestYourApp() {
  const [applications, setApplications] = useState([]);
  // const [filterStatus, setFilterStatus] = useState("all");
  // const { user_id } = useParams();
  const {userData} = useAuth();
  const [isDeclined, setIsDeclined] = useState(false);
  const [filteredApplications, setFilteredApplications] = useState(applications);

  const toggleAccordionItem = (app) => {
    app.isOpen = !app.isOpen;
    setApplications([...applications]);
  };

  const getApplication = async (input) => {
    const userId = input;
    try {
      const params = new URLSearchParams();
      params.append("userId", userId)
      const results = await axios.get(
        "http://localhost:4000/apply/myapplication", {params,}
      );
      setApplications(results.data);
      console.log("results are", results)
    } catch (error) {
      console.error("Error: unable to load applications", error);
    }
  };

  const handleDeclinedApplication = async (application_id) => {
    try {
      await axios.put(`http://localhost:4000/apply/${application_id}`, {
        status: "declined",
      });
      setIsDeclined(true);
    } catch (error) {
      console.error("Error: unable to decline applications", error);
    }
  };

  useEffect(() => {
    getApplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilteredApplication = (status) =>{
    if (status === "all") {
      return applications;
    } else {
      return applications.filter((app)=> app.application_status === status);
    }
  }

  const statusChange = () => {
    if (applications.application_status === "pending") {
      return (
        <div className="flex flex-col text-Pink w-[80px] h-[47px] items-center">
          <img className="w-[15px] h-[15px]" src={pendingIcon} />
          <p>Waiting for review</p>
        </div>
      );
    } else if (applications.application_status === "inprogress") {
      return (
        <div className="flex flex-col text-Pink w-[80px] h-[47px] items-center">
          <img className="w-[15px] h-[15px]" src={letterIcon} />
          <p>Review in progress</p>
        </div>
      );
    } else if (applications.application_status === "finished") {
      return (
        <div className="flex flex-col text-Pink w-[80px] h-[47px] items-center">
          <img className="w-[15px] h-[15px]" src={letterSentIcon} />
          <p>Review finished</p>
        </div>
      );
    } else if (applications.application_status === "declined") {
      return (
        <div className="flex flex-col text-DarkPink w-[80px] h-[47px] items-center">
          <img className="w-[15px] h-[15px]" src={cancelIcon} />
          <p>Declined on {DeclinedDate}</p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col text-Grey w-[80px] h-[47px] items-center">
          <img className="w-[15px] h-[15px]" src={closedIcon} />
          <p>Unknown status</p>
        </div>
      );
    }
  };
  
  const jobCreatedDate = moment(applications.opened_at).fromNow();
  const ApplicationSentDate = moment(applications.sent_date).fromNow();
  const DeclinedDate = moment(applications.sent_date, 'DD-MM-YY');

  return (
    <>
      <div className="flex flex-row bg-Background">
        <YourApplicationSideBar />
        <div className="w-full flex justify-center overflow-x-hidden">
          <div className="w-[960px] py-8 space-y-4">
            <div className="Title text-Headline4 text-DarkGray font-Montserrat font-normal">
              Your applications
            </div>

            <div className="w-full p-2 space-y-4">
              <div>
                <label
                  htmlFor="radioLabel"
                  className="text-DarkGray uppercase text-Overline font-Inter font-normal tracking-[1.5px]"
                >
                  filter your applications
                </label>

                <RadioGroup
                  // value={filterStatus}
                  defaultValue="all"
                  className="flex flex-row space-x-1 font-normal font-Inter text-Body2 tracking-[o.25px]"
                  onValueChange={(value) => {
                    // setFilterStatus(value);
                    const filteredApplications = handleFilteredApplication(value);
                    setFilteredApplications(filteredApplications);
                  }
                  }
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="all" id="r1" />
                    <Label htmlFor="r1" className="text-Gray font-normal ">
                      All
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="pending" id="r2" />
                    <Label htmlFor="r2" className="text-Gray font-normal">
                      Waiting
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="inprogress" id="r3" />
                    <Label htmlFor="r3" className="text-Gray font-normal">
                      In progress
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="finished" id="r4" />
                    <Label htmlFor="r4" className="text-Gray font-normal">
                      Finished
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="declined" id="r5" />
                    <Label htmlFor="r5" className="text-Gray font-normal">
                      Declined
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="w-full space-y-2">
                <div className="text-Headline6 text-DarkGray font-Montserrat font-medium">
                  {applications.length} Applications found
                </div>

                {/* ส่วน Accordian */}
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredApplications.map((app, key) => {
                    return (
                      <AccordionItem value={app.application_id} key={key} application={app}>
                        <AccordionTrigger
                          onClick={() => toggleAccordionItem(app)}
                        >
                          {/* Big container */}
                          <div className="flex flex-row py-[16px]">
                            {/* section 1*/}
                            <div className="font-Montserrat flex flex-row">
                              <div className="w-[59px] h-[59px]">
                                <img className="rounded-sm" src={app.company_logo} />
                              </div>
                              <div className="flex flex-col ml-[16px] items-start w-[180px] h-[64px]">
                                <p className="text-DarkGray text-scale-[20px] text-normal leading-[28px] tracking-[0.15px]">
                                  {app.job_title}
                                </p>
                                <p className="text-Gray text-[14px] font-normal leading-[18px] tracking-[0.1px]">
                                  {app.company_name}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Section 2 */}
                          <div className="w-[350px] h-[40px] flex flex-col font-Inter text-LightGray text-[12px] font-normal leading-[16px] tracking-[0.4px]">
                            <div className="flex flex-row">
                              <img src={category} />
                              <p className="ml-[4px]">{app.category_name}</p>
                              <img src={calendar} className="ml-[4px]" />
                              <p className="ml-[4px]">{app.type_name}</p>
                            </div>
                            <div className="mt-[8px] flex flex-row">
                              <img src={dollarIcon} />
                              <p className="ml-[4px]">
                                {app.salary_min} k
                              </p>- <p>{app.salary_max} k</p>
                              <img className="ml-[4px]" src={timeIcon} />
                              <p className="ml-[4px]">
                                Posted {jobCreatedDate}
                              </p>
                            </div>
                          </div>

                          {/* Section 3 */}
                          <div
                            className="w-[164px] h-[47px] m-[4px] flex flex-row font-Inter text-Gray 
                          text-[12px] font-normal leading-[16px] tracking-[0.4px]"
                          >
                            <div className="flex flex-col w-[80px] h-[47px] items-center">
                              <img
                                className="w-[15px] h-[15px]"
                                src={letterIcon}
                              />
                              <p>sent {ApplicationSentDate}</p>
                            </div>
                            <div>{statusChange()}</div>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent
                          className={app.isOpen ? "block" : "hidden"}
                        >
                          <div className="flex flex-col font-Inter text-[14px] font-normal leading-[20px] tracking-[0.25px]">
                            <h1 className="mt-[16px] font-Montserrat text-Pink text-[16px] font-normal">
                              Professional Experience
                            </h1>
                            <p className="w-[760px]">
                              {app.professional_experience}
                            </p>
                            <h1 className="mt-[16px] font-Montserrat text-Pink text-[16px] font-normal">
                              Why are you interested in working at{" "}
                              <b>{app.company_name}</b>
                            </h1>
                            <p className="w-[760px]">{app.interested_reason}</p>

                            {/* decline button */}
                            {isDeclined ? (
                              <button
                                className="flex flex-row justify-center items-center ml-[300px] 
                              w-[242px] h-[40px] mt-[16px] rounded-[16px] bg-DarkGray pointer-events-none"
                                disabled
                              >
                                <img src={declineIcon} />
                                <p className="ml-[8px] leading-[24px] tracking-[1.25px] uppercase text-white">
                                  declined
                                </p>
                              </button>
                            ) : (
                              <button
                                className="flex flex-row justify-center items-center ml-[300px] 
                            hover:bg-LightPink bg-DarkPink w-[242px] h-[40px] mt-[16px] rounded-[16px]"
                                onClick={() =>
                                  handleDeclinedApplication(
                                    app.application_id
                                  )
                                }
                              >
                                <img src={declineIcon} />
                                <p className="ml-[8px] leading-[24px] tracking-[1.25px] uppercase text-white">
                                  decline application
                                </p>
                              </button>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TestYourApp;
