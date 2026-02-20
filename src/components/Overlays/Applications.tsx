import { FC } from 'react';
import {
  Anchor,
  Card,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
  useMatches,
} from '@mantine/core';
import bg22ek from '@/assets/bg22-ek4108a-explorer-kit.avif';
import bgm220p from '@/assets/bgm220-ek4314a-explorer-kit.avif';
import GithubLogo from '@/assets/github-mark.svg';
import sparkfun from '@/assets/sparkfun_thing_plus_mgm240p.png';
import xg24dk from '@/assets/xg24-dk2601b.avif';
import xg24ek from '@/assets/xg24ek.png';

const Applications: FC<{}> = () => {
  const cardWidth = useMatches({ base: undefined, md: '1000px' });

  return (
    <>
      <Card
        shadow="sm"
        padding="xl"
        radius="md"
        withBorder
        style={{ width: cardWidth, maxWidth: '1200px', margin: 15 }}
      >
        <Card.Section component="div" m={5}>
          <Title order={3} style={{ textAlign: 'center' }} mb={5}>
            Compatible Products
          </Title>
          <Text style={{ marginBottom: 35, textAlign: 'center' }}>
            This browser-based BLE Terminal application is compatible with these products:
          </Text>
          <Grid columns={13} justify="center" align="flex-start">
            <Grid.Col span={{ xs: 12, md: 'auto' }}>
              <Stack align="center" justify="center" gap="md">
            
                <Divider my="xs" label="Clipper compatibility" labelPosition="center" w="100%" />
                <Group justify="center" gap="md">
                  <Stack align="center" justify="flex-end" gap="md">
                    <Anchor
                      target="_blank"
                      underline="hover"
                      c="black"
                      href="https://hagbardz.github.io/web-ble-uart-app/"
                    >
                      <Stack align="center" justify="flex-end" gap="xs">
                        <Image src={xg24ek} mih={75} mah={75} w="auto" alt="xG24EK" />
                        <Text size="xs">1588</Text>
                      </Stack>
                    </Anchor>
                  </Stack>
                  <Stack align="center" justify="flex-end" gap="md">
                    <Anchor
                      target="_blank"
                      underline="hover"
                      c="black"
                      href="https://hagbardz.github.io/web-ble-uart-app/"
                    >
                      <Stack align="center" justify="flex-end" gap="xs">
                        <Image src={xg24dk} mih={75} mah={75} w="auto" alt="xG24DK" />
                        <Text size="xs">Bravura2.0</Text>
                      </Stack>
                    </Anchor>
                  </Stack>
                  <Stack align="center" justify="flex-end" gap="md">
                    <Anchor
                      target="_blank"
                      underline="hover"
                      c="black"
                      href="https://hagbardz.github.io/web-ble-uart-app/"
                    >
                      <Stack align="center" justify="flex-end" gap="xs">
                        <Image src={bgm220p} mih={75} mah={75} w="auto" alt="1871" />
                        <Text size="xs">Chromstyle</Text>
                      </Stack>
                    </Anchor>
                  </Stack>
                  <Stack align="center" justify="flex-end" gap="md">
                    <Anchor
                      target="_blank"
                      underline="hover"
                      c="black"
                      href="https://hagbardz.github.io/web-ble-uart-app/"
                    >
                      <Stack align="center" justify="flex-end" gap="xs">
                        <Image src={bg22ek} mih={75} mah={75} w="auto" alt="KM" />
                        <Text size="xs">KM Series</Text>
                      </Stack>
                    </Anchor>
                  </Stack>
                  <Stack align="center" justify="flex-end" gap="md">
                    <Anchor
                      target="_blank"
                      underline="hover"
                      c="black"
                      href="https://hagbardz.github.io/web-ble-uart-app/"
                    >
                      <Stack align="center" justify="flex-end" gap="xs">
                        <Image
                          src={sparkfun}
                          mih={75}
                          mah={75}
                          w="auto"
                          alt="1877"
                        />
                        <Text size="xs">Chrom2Style</Text>
                      </Stack>
                    </Anchor>
                  </Stack>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span="content" style={{ alignSelf: 'stretch' }} visibleFrom="md">
              <Divider orientation="vertical" h="100%" variant="dashed" />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, md: 'auto' }}>
            
            </Grid.Col>
          </Grid>
        </Card.Section>
      </Card>
    </>
  );
};

export default Applications;
