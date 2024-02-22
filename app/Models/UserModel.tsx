"use client";
import React, { useState } from "react";
import {
  Avatar,
  Text,
  GridCol,
  Button,
  Paper,
  Grid,
  Group,
} from "@mantine/core";
import {
  IconAt,
  IconPhoneCall,
  IconWorld,
  IconUserPlus,
  IconTrash,
  IconStar,
} from "@tabler/icons-react";
import data from "../../data.json";

const UserModel = () => {
  const [followedCards, setFollowedCards] = useState([]);
  const [userData, setUserData] = useState(data);

  const handleFollowToggle = (index) => {
    const updatedFollowedCards = [...followedCards];
    const cardIndex = updatedFollowedCards.indexOf(index);
    if (cardIndex === -1) {
      updatedFollowedCards.push(index);
    } else {
      updatedFollowedCards.splice(cardIndex, 1);
    }
    setFollowedCards(updatedFollowedCards);
  };

  const handleDelete = (e, index) => {
    e.stopPropagation();
    const newData = [...userData];
    newData.splice(index, 1);
    setFollowedCards(followedCards.filter((cardIndex) => cardIndex !== index));

    setUserData(newData);
  };

  const isFollowed = (index) => {
    return followedCards.includes(index);
  };


  return (
    <>
      <Grid justify="center" align="start" p={12}>
        {userData.map((data, i) => {
          const isSelected = isFollowed(i);
          const initials = `${data.name.split(" ")[0][0]}${
            data.name.split(" ")[1][0]
          }`;
          const diceBearUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${initials}`;

          return (
            <Paper
              key={data.id}
              radius="md"
              withBorder
              p="md"
              bg="var(--mantine-color-body)"
              my={8}
              mx={8}
            >
              <Avatar src={diceBearUrl} size={100} radius={100} mx="auto">
                {initials}
              </Avatar>

              <Group wrap="nowrap" mt={10}>
                <Text ta="center" fz="lg" fw={500} mt="md">
                  {data?.name}
                  {isSelected && <IconStar  size="1rem" color="black" />}
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={10}>
                <IconAt stroke={1.5} size="1rem"/>
                <Text fz="xs" c="dimmed">
                  {data?.username}
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <IconPhoneCall
                  stroke={1.5}
                  size="1rem"
                />
                <Text fz="xs" c="dimmed">
                  {data?.phone}
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <IconWorld stroke={1.5} size="1rem" />
                <Text fz="xs" c="dimmed">
                  {data.website}
                </Text>
              </Group>

              <Grid mt="sm">
                <GridCol span={6}>
                  <Button
                    leftSection={<IconUserPlus size={14} />}
                    variant="filled"
                    onClick={() => handleFollowToggle(i)}
                  >
                    {isSelected ? "Unfollow" : "Follow"}
                  </Button>
                </GridCol>
                <GridCol span={6}>
                  <Button
                    leftSection={<IconTrash size={14} />}
                    variant="outline"
                    onClick={(e) => handleDelete(e, i)}
                  >
                    Delete
                  </Button>
                </GridCol>
              </Grid>
            </Paper>
          );
        })}
      </Grid>
    </>
  );
};

export default UserModel;
