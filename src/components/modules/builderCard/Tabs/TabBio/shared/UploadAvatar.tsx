import { useState, useRef, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FileButton, Button, Group, Flex, Progress } from "@mantine/core";
import { storage } from "../../../../../..";
import { useSelector, useDispatch } from "react-redux";
import {
  cardSelector,
  setAvatar,
} from "../../../../../../store/slices/cardSlices";
import { Stack } from "@mantine/core";
import { createStyles } from '@mantine/styles';




export const useStyles = createStyles((theme) => ({
  uploadAvatar: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    border: "1px solid black",
    fontSize: 12,
    cursor: 'pointer',
    [`@media (max-width: 700px)`]: {

    width: 100,
    height: 100,
    },
  }
}));



export const UploadAvatar = () => {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);
  const card = useSelector(cardSelector);
  const dispatch = useDispatch();
  const { classes } = useStyles();

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
    dispatch(setAvatar(""));
  };

  const [progresspercent, setProgresspercent] = useState(0);

  useEffect(() => {
    handleSubmit();
    setProgresspercent(0);
  }, [file]);

  const handleSubmit = () => {
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          dispatch(
            setAvatar({
              avatar: downloadURL,
            })
          );
        });
      }
    );
  };

  return (
    <>
      <Stack>
        <div>
          <Progress value={progresspercent} />
          <Group position="center" style={{ marginTop: '20px' }}>
            <FileButton
              resetRef={resetRef}
              onChange={setFile}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Flex
                  {...props}
                  justify={"center"}
                  align={"center"}
                  className={classes.uploadAvatar}
                >
                  upload avatar
                </Flex>
              )}
            </FileButton>
            <Button disabled={!card.avatar} color="red" onClick={clearFile}>
              Reset
            </Button>
          </Group>
        </div>
      </Stack>
    </>
  );
};
