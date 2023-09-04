import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfessionalInfo() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [jobExp, setJobExp] = useState("");
  const [education, setEducation] = useState("");

  const handlerPrevious = (event) =>{
    event.preventDefault();
    navigate("/user/register2")
  };

  const handlerSkip = (event) =>{
    event.preventDefault();
    navigate("/path หน้า job listing")
  };
  
  const handlerSubmit = (event) => {
    event.preventDefault();
    const data = {
      title,
      jobExp,
      education,
    };
    navigate("/path หน้า job listing");
  };

  return (
    <>
      <form className="professional-info">
        <div className="input-container">
          <div className="title-input">
            <label htmlFor="title">
              TITLE
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Example: Mechanical administrator"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </label>
          </div>
          <div className="job-exp-input">
            <label>
              PROFESSIONAL EXPERIENCE
              <input
                id="jobexp"
                name="jobexp"
                type="text"
                placeholder="Worked 6 years in a bitcoin farm until I decided to change my life..."
                value={jobExp}
                onChange={(event) => setJobExp(event.target.value)}
                required
              />
            </label>
          </div>
          <div className="education-input">
            <label>
              EDUCATION
              <input
                id="education"
                name="education"
                type="text"
                placeholder="Major in life experiences with a PHD in procrastination"
                value={education}
                onChange={(event) => setEducation(event.target.value)}
                required
              />
            </label>
          </div>
          <div className="previous-button">
            <button onClick={handlerPrevious}>PREVIOUS</button>
          </div>
          <div className="skip-button">
            <button onClick={handlerSkip}>SKIP THIS!</button>
          </div>
          <div className="next-button">
            <button onClick={handlerSubmit}>NEXT</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ProfessionalInfo;

