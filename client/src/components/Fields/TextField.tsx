import React from "react"
import MuiTextField, { TextFieldProps } from "@mui/material/TextField"

export default function TextField(props: TextFieldProps) {
  return <MuiTextField variant="outlined" fullWidth={props.fullWidth ?? true} {...props} />
}
