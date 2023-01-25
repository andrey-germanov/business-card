import { useState, useRef, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  FileButton,
  Button,
  Group,
  Text,
  Popover,
  Tooltip,
  Flex,
  Progress,
} from "@mantine/core";
import { storage } from "../..";
import { useSelector, useDispatch } from "react-redux";
import { cardSelector, setCard } from "../../store/slices/cardSlices";
import { Stack } from "@mantine/core";

export const UploadAvatar = () => {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);
  const card = useSelector(cardSelector);
  const dispatch = useDispatch();

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [progresspercent, setProgresspercent] = useState(0);

  useEffect(() => {
    handleSubmit();
    setImgUrl(null);
    setProgresspercent(0);
    dispatch(
      setCard({
        ...card,
        avatar: "",
      })
    );
  }, [file]);

  const handleSubmit = () => {
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(
          "snapshot.bytesTransferred / snapshot.totalBytes",
          snapshot.bytesTransferred,
          snapshot.totalBytes
        );
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
          setImgUrl(downloadURL);
          dispatch(
            setCard({
              ...card,
              avatar: downloadURL,
            })
          );
        });
      }
    );
  };

  return (
    <>
      <Group position="center" style={{ position: "relative" }}>
        {!imgUrl && (
          <Progress style={{ position: "absolute" }} value={progresspercent} />
        )}
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
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                border: "1px solid black",
              }}
            >
              upload avatar
            </Flex>
          )}
        </FileButton>
        <Button disabled={!file} color="red" onClick={clearFile}>
          Reset
        </Button>
        {/* {file && (
          <Text
            style={{ position: "absolute", top: '-70px' }}
            size="sm"
            align="center"
            mt="sm"
          >
            {file.name}
          </Text>
        )} */}
      </Group>
    </>
  );
};
