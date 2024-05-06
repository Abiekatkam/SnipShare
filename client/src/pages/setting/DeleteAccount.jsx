import SpinLoader from "@/components/loaders/SpinLoader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteAccount = () => {
  const [formState, setFormState] = useState({
    email: ""
  })
  const [isValidDelete, setIsValidDelete] = useState(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: authenticatedUser } = useQuery({
    queryKey: ["authorisedCurrentUser"],
  });

  const handleFormStateChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formState.email !== authenticatedUser.email) {
      return toast.error("Email address didn't matched. Please enter a valid email");
    }
    if (
      formState.email === authenticatedUser.email
    ) {
      DeleteAccountMutation({
       email:formState.email
      });
    }
  };

  const { mutate: DeleteAccountMutation, isPending } = useMutation({
    mutationFn: async ({ email }) => {
      try {
        const response = await fetch("/api/users/delete-profile", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (data.status == "error") {
          return toast.error(data.message);
        }

        if (data.status == "success") {
          queryClient.invalidateQueries({
            queryKey: ["authorisedCurrentUser"],
          });
          toast.success(data.message);
          navigate("/login")
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  useEffect(()=>{
    if(formState.email == authenticatedUser.email){
      setIsValidDelete(false)
    }else{
      setIsValidDelete(true)
    }
  },[formState.email])

  return (
    <Card className="w-full border border-red-600 dark:bg-[#09090b]">
      <CardHeader className="border-b border-border p-4 pb-2">
        <h2 className="font-semibold text-primary dark:text-white">
          Delete Account
        </h2>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="relative my-3 flex items-center justify-between">
          <div>
            <p className="mr-1 text-sm">
              Permanently delete your account and all its associated data, this
              action cannot be undone.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end rounded-bl-xl rounded-br-xl border-b border-border">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size={"sm"}
              className="relative top-2"
              variant={"destructive"}
            >
              Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] dark:bg-[#09090b]">
            <DialogHeader>
              <DialogTitle>Delete accout permanently</DialogTitle>
              <DialogDescription>
                Type this account email to delete your account and its data
              </DialogDescription>
            </DialogHeader>
            <input
              className="mt-2 block lg:h-9 h-8 w-full appearance-none rounded-md bg-white dark:bg-[#09090b] px-3 text-sm  shadow-sm ring-1 ring-gray-400 dark:ring-gray-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 placeholder:italic focus:ring-gray-900 dark:focus:ring-gray-300"
              type="email"
              required
              autoComplete="off"
              placeholder="email-address@gmail.com"
              name="email"
              value={formState.email}
              onChange={handleFormStateChange}
            />
            <DialogFooter>
              <Button
                onClick={handleFormSubmit}
                variant={"destructive"}
                disabled={isPending || isValidDelete}
                className="user-select-none mt-4 w-full"
              >
                {isPending ? <SpinLoader /> : "Confirm delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default DeleteAccount;
