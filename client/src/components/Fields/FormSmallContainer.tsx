import React from "react"
import Box, { BoxProps } from "@mui/material/Box"

type FormSmallContainerProps = BoxProps & {
  children: any
}

export default function FormSmallContainer({ children, ...props }: FormSmallContainerProps) {
  return (
    <Box m="auto" maxWidth={640} pt={1} width="100%" {...props}>
      {children}
    </Box>
  )
}
