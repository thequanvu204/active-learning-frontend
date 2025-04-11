import { useState } from "react";
import {
  Text,
  HStack,
  VStack,
  Flex,
  Button,
  Box,
  Accordion,
  Span,
  Code,
  Field,
  NumberInput,
} from "@chakra-ui/react";
import Navigationbar from "@/components/Navbar.tsx";
import axios from "axios";

import "./eingabe.css";

export default function Eingabe() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Khi file được chọn từ Dropzone
  const handleFileChange = (fileObject: { acceptedFiles: File[] }) => {
    console.log("📂 Selected files:", fileObject);
    setSelectedFiles(fileObject.acceptedFiles);
  };

  // Xóa file khỏi danh sách
  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Khi bấm "Let's Go!!!!", gửi file lên server
  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert("❌ Please select a file first!");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      console.log("📤 Uploading files:", selectedFiles);
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("✅ Upload success:", response.data);
      alert("✅ Upload successful!");
    } catch (error: any) {
      console.error("❌ Upload failed", error.response?.data || error.message);
      alert(
        "❌ Upload failed: " + (error.response?.data.message || error.message)
      );
    }
  };

  return (
    <>
      <Flex direction="column">
        <Navigationbar />
        <VStack mt="80px" alignSelf="center" mb="20px">
          <Text textStyle="3xl" fontWeight="bold">
            Algorithm
          </Text>
          <Box marginLeft={"250px"} marginRight={"250px"}>
            <Text textStyle="1xl" fontWeight="normal">
              Das Programm arbeitet mit
              <Code>init_training_length</Code>
              vielen gelabelten Datenpunkten aus einem Pool von
              <Code>training_size</Code>
              vielen möglichen Parametern. Führt dann
              <Code>num_cycles</Code>
              viele Active Learning Zykel durch und in jedem Zyklus werden
              <Code>batch_size</Code>
              viele neue Datenpunkte zur Simulation und Modellverbesserung
              ausgewählt.
            </Text>
          </Box>
          <Text textStyle="2xl" fontWeight="medium">
            Insert parameters:
          </Text>
        </VStack>

        <VStack borderSpacing={10} justify="center">
          <HStack borderSpacing={10}>
            <Field.Root>
              <Field.Label>
                <Code>init_train_length</Code>
              </Field.Label>
              <NumberInput.Root defaultValue="128" min={1} allowMouseWheel>
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
            </Field.Root>
            <Field.Root>
              <Field.Label>
                <Code>training_size</Code>
              </Field.Label>
              <NumberInput.Root defaultValue="10000" min={1} allowMouseWheel>
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
            </Field.Root>
          </HStack>
          <HStack borderSpacing={10}>
            <Field.Root>
              <Field.Label>
                <Code>num_cycles</Code>
              </Field.Label>
              <NumberInput.Root defaultValue="20" min={1} allowMouseWheel>
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
            </Field.Root>
            <Field.Root>
              <Field.Label>
                <Code>batch_size</Code>
              </Field.Label>
              <NumberInput.Root defaultValue="10" min={1} allowMouseWheel>
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
            </Field.Root>
          </HStack>
          <Box alignItems="flex-end">
            <Button className="run" onClick={handleUpload}>
              Run Algorithm
            </Button>
          </Box>
        </VStack>

        <Flex
          marginLeft={"250px"}
          direction={"column"}
          //p={"40"}
        >
          <Box maxW={"800px"} alignItems={"flex-start"}>
            <Text
              marginTop={"20px"}
              fontWeight={"bold"}
              fontSize={"2xl"}
              alignSelf={"flex-start"}
            >
              Legende
            </Text>

            <Accordion.Root
              multiple
              defaultValue={[]}
              alignItems={"flex-start"}
            >
              {items.map((item, index) => (
                <Accordion.Item key={index} value={item.value}>
                  <Accordion.ItemTrigger>
                    <Span cursor={"pointer"}>{item.title}</Span>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

const items = [
  {
    value: "a",
    title: "init_train_length",
    text: "Die Anzahl der Datenpunkte, mit denen das Modell initial \
    trainiert wird, bevor Active Learning beginnt.",
  },
  {
    value: "b",
    title: "training_size",
    text: "Die maximale Anzahl an gelabelten Daten, \
    die während des Active Learning Zyklus gesammelt werden können.",
  },
  {
    value: "c",
    title: "num_cycles",
    text: "Die Anzahl der Active Learning Zyklen beschreibt, wie oft \
    das Modell neue Datenpunkte anfordert, trainiert und evaluiert.",
  },
  {
    value: "d",
    title: "batch_size",
    text: "Die Anzahl an neuen unlabeled Datenpunkten, die in jedem Active \
    Learning Zyklus zum Training hinzugefügt werden. \
    Eine Hälfte der Datenpunkte kommen aus den besten \
    Vorhersagen, die andere Hälfte zufällig gewählt aus dem Pool.",
  },
];
