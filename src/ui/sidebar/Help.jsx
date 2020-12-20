import Tab from "ui/common/Tab";
import TabContent from "ui/common/TabContent";
import Anchor from "ui/common/Anchor";
import Icon from "@mdi/react";
import { mdiDiscord, mdiGithub, mdiGiftOutline, mdiTextBoxMultiple } from "@mdi/js";

const Help = () => {
  return (
    <Tab title="About">
      <TabContent>
        <div className='max-w-md mx-2'>
          <p className='pb-2'>Textyle is a free and open source tilemap editor that is still in development. The goal is to provide the most simple and straightforward way to create 2D tilemaps.</p>
          <p className='pb-2'>If you need help using the editor, check the tutorials and documentation <Anchor href='https://textyle.app/learn'>here</Anchor>.</p>
          <p className='pb-2'>If you enjoy this project and want to help in its development, consider:</p>
          <ul className='list-disc ml-6 pb-2'>
            <li>Talking to us on <Anchor href='https://discord.gg/BtEPJmkacp'>Discord</Anchor></li>
            <li>Contributing to the code on <Anchor href='https://github.com/stefandevai/textyle'>GitHub</Anchor></li>
            <li><Anchor href='https://textyle.app/contribute'>Donating</Anchor> any amount</li>
          </ul>
        </div>
        <div className='flex justify-evenly items-center mt-4'>
          <Anchor href='https://discord.gg/BtEPJmkacp'>
            <Icon path={mdiDiscord} size={1.0} />
          </Anchor>
          <Anchor href='https://github.com/stefandevai/textyle'>
            <Icon path={mdiGithub} size={1.0} />
          </Anchor>
          <Anchor href='https://textyle.app/learn'>
            <Icon path={mdiTextBoxMultiple} size={1.0} />
          </Anchor>
          <Anchor href='https://textyle.app/contribute'>
            <Icon path={mdiGiftOutline} size={1.0} />
          </Anchor>
        </div>
      </TabContent>
    </Tab>
  );
};

export default Help;
