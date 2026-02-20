import { FC, JSX, useEffect, useRef, useState } from 'react';
import { IconTrashX } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Button,
  Grid,
  Input,
  rem,
  ScrollArea,
  Select,
  Stack,
  Switch,
  useMantineColorScheme,
  useMatches,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import useBluetoothService from '@/hooks/useBluetoothService';
import useLoader from '@/hooks/useLoader';
import dataviewToString from '@/utils/dataviewToString';
import sliceStringIntoChunks from '@/utils/sliceStringIntoChunks';
import stringToUint8Array from '@/utils/stringToUint8Array';
import classes from './Terminal.module.css';

interface TerminalProps {}

const Terminal: FC<TerminalProps> = () => {
  const serviceUUID = __APP_SPP_BLE_SERVICE__;
  const characteristicUUID = __APP_SPP_BLE_CHARACTERISTIC__;

  const loader = useLoader();

  const { colorScheme } = useMantineColorScheme();

  const viewportRef = useRef<HTMLDivElement>(null);
  const viewportSize = useMatches({
    base: 'calc(100vh - var(--app-shell-header-height) - var(--app-shell-footer-height) - 32vh)',
    md: 'calc(100vh - var(--app-shell-header-height) - var(--app-shell-footer-height) - 17vh)',
  });

  const [command, setCommand] = useState<string>('');
  const [echoing, setEchoing] = useState<boolean>(true);
  const [content, setContent] = useState<(string | JSX.Element)[]>([]);
  const [lineTerminator, setLineTerminator] = useState<string | null>('NULLX');

  const clear = () => setContent([]);
  const append = (content: string | JSX.Element) => setContent((prev) => [...prev, content]);
  

  function dataViewToHex(value: DataView): string {
  const bytes = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);

  return Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, "0")) // 2-digit hex
    .join("")
    .toUpperCase();
}
  
  
  const service = useBluetoothService({ uuid: serviceUUID });
var IndexY=0;
var Data_ModellNR="  ";

const characteristic = service.useBluetoothCharacteristic({
  uuid: characteristicUUID,
  onValueChanged: (value: DataView | undefined) => {
    if (!value) return;

    let hexString = dataViewToHex(value);    
    hexString=hexString.replaceAll("313233343536370D","--EOL--\r\n\r\n");     
    
     Data_ModellNR=hexString.substring(0,2);
 
    
    append(hexString);
    
    //setContent([hexString]);
  
    
    
  // const receivedContent = dataviewToString(value);
  // append(receivedContent);
  }
  });



const sendMO1 = async () => {
    const chunks = prepareData();
          try {     
        await characteristic.characteristic?.writeValueWithoutResponse(
          stringToUint8Array(">>>MO1\0")
        );
      
      setCommand('');
    } catch (error) {
      notifications.show({ message: 'Failed to send data to the connected device.', color: 'red' });
    }
  };

const sendMO0 = async () => {
    const chunks = prepareData();
          try {     
        await characteristic.characteristic?.writeValueWithoutResponse(
          stringToUint8Array(">>>MO0\0")
        );
      
      setCommand('');
    } catch (error) {
      notifications.show({ message: 'Failed to send data to the connected device.', color: 'red' });
    }
  };




  const send = async () => {
    const chunks = prepareData();

    try {
      for (let i = 0; i < chunks.length; i++) {
        await characteristic.characteristic?.writeValueWithoutResponse(
          stringToUint8Array(chunks[i])
        );
      }     
      setCommand('');
    } catch (error) {
      notifications.show({ message: 'Failed to send data to the connected device.', color: 'red' });
    }
  };

  const prepareData = (): string[] => {
    const ltMap: Record<string, string> = {
      None: '',
       NULLX: '\0',      
      CR: '\r',
      LF: '\n',
      'CR-LF': '\r\n'
    };

    let data = command;
    if (lineTerminator !== null && lineTerminator !== 'None') {
      data += ltMap[lineTerminator];
    }

    if (echoing) {
      append(
        <span key={content.length} style={{ color: '#0080FF' }}>
          {data}
        </span>
      );
    }
    return sliceStringIntoChunks(data);
  };

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [content]);

  useEffect(() => {
    if (characteristic.characteristic) {
      loader.setLoading(false);
    }
  }, [characteristic.characteristic]);

  return (
    <>
      <Box
        style={{
          marginBottom: 15,
          marginTop: 5,
          overflow: 'hidden',
          maxHeight:
            'calc(100vh - var(--app-shell-header-height) - var(--app-shell-footer-height))',
        }}
        flex={1}
        display="flex"
      >
        <Stack align="stretch" justify="space-between" flex={1}>
          <Box
            style={{
              position: 'relative',
              background: '#F9F9F9',
              boxShadow: '0 1px 4px 0 rgba(0,0,0,.10)',
              border: '1px solid gray',
              maxHeight: viewportSize,
              minHeight: viewportSize,
            }}
          >
            <ScrollArea
              bg={colorScheme === 'light' ? '#fdfdfd' : 'black'}
              style={{
                background: '#F9F9F9',
                height: 'calc(100% - 75px)',
              }}
              viewportRef={viewportRef}
              component="pre"
              className={classes.viewportPre}
              c="dimmed"
            >
              {content}
            </ScrollArea>
            <ActionIcon
              variant="subtle"
              aria-label="Settings"
              color="red"
              style={{ position: 'absolute', bottom: 15, right: 15, zIndex: 4 }}
              onClick={clear}
            >
              <IconTrashX style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
            </ActionIcon>
            <Switch
              radius="md"
              label="Echo"
              labelPosition="left"
              checked={echoing}
              style={{ position: 'absolute', bottom: 15, left: 15, zIndex: 4 }}
              onChange={(e) => setEchoing(e.currentTarget.checked)}
            />
          </Box>
          <Grid justify="space-between" align="flex-end">
            <Grid.Col span={{ xs: 12, md: 'auto' }}>
              <Input
                placeholder="Enter Command, starting with >>> (e.g. >>>MO1 to turn the Motor on)"
                value={command}
                onKeyDown={(e) => {
                  if (e.code === 'Enter') {
                    send();
                  }
                }}
                onChange={(event) => {
                  setCommand(event.currentTarget.value);
                }}
              />
            </Grid.Col>
            <Grid.Col span={{ xs: 6, md: 1 }}>
              <Select
                label="Line terminator"
                value={lineTerminator}
                data={['None', 'NULLX', 'CR', 'LF','CR-LF']}
                allowDeselect={false}
                onChange={setLineTerminator}
              />
            </Grid.Col>
            <Grid.Col span={{ xs: 12, md: 'content' }}>
              <Button variant="outline" onClick={send}>
                Send
              </Button>
            </Grid.Col>
             <Grid.Col span={{ xs: 12, md: 'content' }}>
              <Button variant="outline" onClick={sendMO0}>
                Motor OFF
              </Button>
               <Button variant="outline" onClick={sendMO1}>
                Motor ON
              </Button>
            </Grid.Col>
          </Grid>
        </Stack>
      </Box>
    </>
  );
};

export default Terminal;
