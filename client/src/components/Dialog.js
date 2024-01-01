import React from "react"
import PropTypes from "prop-types"
import MuiDialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Container } from "@mui/material"


export default function Dialog({ children, onClose, open, title, maxWidth, ...props }) {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog"
      fullWidth
      maxWidth={maxWidth ?? "sm"}
      {...props}
    >
      <Container>
        {title ? <DialogTitle sx={{ pt: 5 }}>{title}</DialogTitle> : <></>}
        <DialogContent sx={{pb: 5, pt: title ? 0 : 7}}>{children}</DialogContent>
      </Container>
    </MuiDialog>
  )
}

Dialog.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
}
