"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useActionState } from "react";
import { actionFunction } from "@/utils/types";

const initialState = {
  message: "",
};

function FormContainer({
  action,
  children,
  onSuccess,
}: {
  action: actionFunction;
  children: React.ReactNode;
  onSuccess?: () => void;
}) {
  const [state, formAction] = useActionState(action, initialState);
  const { toast } = useToast();
  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
      onSuccess?.();
    }
  }, [state, toast, onSuccess]);
  return <form action={formAction}>{children}</form>;
}
export default FormContainer;
