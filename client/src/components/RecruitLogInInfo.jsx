import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useEffect } from "react";

function RecruitLogInInfo() {
  const navigate = useNavigate();
  const { recruiterData, setRecruiterData } = useGlobalContext();
  const { handleSubmit, control, setError, clearErrors, formState: { errors } } = useForm();

  useEffect(() => {
    console.log("Updated recruiterData:", recruiterData);
  }, [recruiterData]);

  const onSubmit = async (data) => {
    // Check if passwords match
    if (data.confirmedPassword !== data.companypassword) {
      setError("confirmedPassword", {
        type: "manual",
        message: "The confirmed Password is not matched",
      });
    } else {
      // Clear the error if passwords match
      clearErrors("confirmedPassword");

      try {
        await setRecruiterData({
          companyname: control._fields.companyname._f.value,
          companyemail: control._fields.companyemail._f.value,
          companypassword: control._fields.companypassword._f.value,
        });

        navigate("/recruiter/register2");
      } catch (error) {
        console.error("Error during registration", error);
      }
    }
  };

  return (
    <form className="font-Inter" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <div className="company-name-input">
          <label htmlFor="company-name" className="mb-[4px] text-xs[10px] font-normal tracking-[1.5px]">
            COMPANY NAME
            <Controller
              name="companyname"
              control={control}
              defaultValue=""
              rules={{ required: "Company name is required" }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  name="companyname"
                  id="companyname"
                  type="text"
                  placeholder="My Company S.A"
                  {...field}
                />
              )}
            />
          </label>
          <span>{errors.companyname && errors.companyname.message}</span>
        </div>

        <div className="email-input">
          <label htmlFor="email" className="mb-[4px] text-xs[10px] font-normal tracking-[1.5px]">
            EMAIL
            <Controller
              name="companyemail"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="companyemail"
                  name="companyemail"
                  type="email"
                  placeholder="some.user@mail.com"
                  {...field}
                />
              )}
            />
          </label>
          <span>{errors.companyemail && errors.companyemail.message}</span>
        </div>

        <div className="password-input">
          <label htmlFor="password" className="mb-[4px] text-xs[10px] font-normal tracking-[1.5px]">
            PASSWORD
            <Controller
              name="companypassword"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="companypassword"
                  name="companypassword"
                  type="password"
                  placeholder="******"
                  {...field}
                />
              )}
            />
          </label>
          <span>{errors.companypassword && errors.companypassword.message}</span>
        </div>

        <div className="confirmed-password-input">
          <label htmlFor="confirmed-password" className="mb-[4px] text-xs[10px] font-normal tracking-[1.5px]">
            PASSWORD CONFIRMATION
            <Controller
              name="confirmedPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "Password confirmation is required",
              }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="confirmed-password"
                  type="password"
                  placeholder="******"
                  {...field}
                />
              )}
            />
          </label>
          <span>{errors.confirmedPassword && errors.confirmedPassword.message}</span>
        </div>

        <div className="w-[106px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
          <button type="submit">NEXT</button>
        </div>
      </div>
    </form>
  );
}

export default RecruitLogInInfo;
