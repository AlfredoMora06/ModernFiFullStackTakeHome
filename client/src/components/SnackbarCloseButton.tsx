import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import { useSnackbar } from 'notistack'


interface SnackbarCloseButtonProps {
  snackbarKey:  string | number,
}

function SnackbarCloseButton({ snackbarKey } : SnackbarCloseButtonProps ) {
  const { closeSnackbar } = useSnackbar()

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <CloseIcon sx={{color: "white"}} />
    </IconButton>
  )
}

export default SnackbarCloseButton