import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "react-router-dom";

const ForgotPasswordModal = ({ targetEmail }) => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const forgotPasswordRef = useRef(null);
  const navigate = useNavigate();

  const handleDialogTrigger = () => {
    if (isEmailValid) {
      forgotPasswordRef.current.click();
    } else {
      toast.error("Please enter a valid email address");
    }
  };
  

  const handleVerifyOtp = () => {
    if(otpValue != "" && otpValue.length == 6){
        navigate("/reset-password")
    }else{
        toast.error("OTP didn't matched. Please enter a valid OTP.")
    }
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(targetEmail));
  }, [targetEmail]);

  return (
    <>
      <button
        type="button"
        className="w-fit text-[#09090b] font-semibold text-xs h-fit hover:underline"
        onClick={handleDialogTrigger}
      >
        Forgot password?
      </button>
      <Dialog>
        <DialogTrigger asChild>
          <button ref={forgotPasswordRef}></button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="p-0 pb-2">
            <DialogTitle className="text-lg">Email verification</DialogTitle>
            <DialogDescription>
              An OTP has been sent to the email address {targetEmail}. Please
              verify your email by entering the code.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center gap-4">
            <InputOTP maxLength={6} value={otpValue} onChange={(value) => setOtpValue(value)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} className="h-9 w-9" />
                <InputOTPSlot index={1} className="h-9 w-9" />
                <InputOTPSlot index={2} className="h-9 w-9" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} className="h-9 w-9" />
                <InputOTPSlot index={4} className="h-9 w-9" />
                <InputOTPSlot index={5} className="h-9 w-9" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <DialogFooter>
            <Button onClick={handleVerifyOtp} className="h-8">
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ForgotPasswordModal;
