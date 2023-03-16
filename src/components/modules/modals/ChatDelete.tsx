import useChatRoomStore from "@/stores/messagesStore";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import axios from "axios";
import * as React from "react";

interface ChatRenameProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatDeleteModal: React.FC<ChatRenameProps> = ({ open, setOpen }) => {
  const { deleteChat, chatId } = useChatRoomStore();
  const handleChatDelete = async () => {
    try {
      console.log("chatId", chatId);
      const res = await axios.delete(`/api/chats/${chatId}`);
      deleteChat(chatId);
      setOpen(false);
    } catch (err) {}
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        aria-labelledby="alert-dialog-modal-title"
        aria-describedby="alert-dialog-modal-description">
        <Typography
          id="alert-dialog-modal-title"
          component="h2"
          startDecorator={<WarningRoundedIcon />}>
          Confirmation
        </Typography>
        <Divider />
        <Typography
          id="alert-dialog-modal-description"
          textColor="text.tertiary">
          Are you sure you want to discard all of your notes?
        </Typography>
        <Box
          sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}>
          <Button
            variant="plain"
            color="neutral"
            onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="solid" color="danger" onClick={handleChatDelete}>
            Delete Conversation
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default ChatDeleteModal;
