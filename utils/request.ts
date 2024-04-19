'use client';
import { signIn } from "next-auth/react";
import { isRedirectError } from "next/dist/client/components/redirect";
import { TInputsSignup } from "@/types/auth";
import { useRouter } from "next/navigation";
import { TInputsLogin } from "@/types/auth";
import { redirect } from 'next/navigation'
import { SERVER_PROPS_EXPORT_ERROR } from "next/dist/lib/constants";

