import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import MyCustomTaskInfoPanelItem from "./MyCustomTaskInfoPanelItem";
import NewMuteButton from "./NewMuteButton";

// import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';



const PLUGIN_NAME = 'TodoPlugin';

export default class TodoPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    let role = '';
    this.registerReducers(manager);

    // const options = { sortOrder: -1 };
    // flex.AgentDesktopView
    //   .Panel1
    //   .Content
    //   .add(FlexPlugin.dialpad , options);
    
    console.log("FLEX COMPONENT", flex);
    flex.AgentDesktopView.Panel2.Content.remove("container");
    flex.MainHeader.Content.remove("dialpad-button")


    flex.TaskInfoPanel.Content.add(<MyCustomTaskInfoPanelItem key="to-do-list"/> );

    flex.NoTasksCanvas.Content.add(<NewMuteButton key="mute"/>, {
      if : props => {
        role = props.worker.attributes.hd_role;
        if(role === "agent"){
          flex.SideNav.Content.remove("dashboards");
          flex.SideNav.Content.remove("analyze");
          flex.SideNav.Content.remove("questionnaires");
        }
        return role === "agent"}  
    });

    flex.AgentDesktopView.Panel2.Content.add(<flex.OutboundDialerPanel key="outbound-dailer-panel-new"/>);

    // Test code for futire references

    // flex.MainContainer.Content.remove("sidenav");
    // flex.OutboundDialerPanel.Content.remove("header");
    // flex.OutboundDialerPanel.Content.remove("close-button");
    // flex.AgentDesktopView.Panel2.OutboundDialerPanel.Content.remove("close-button");
    // flex.AgentDesktopView.Panel2.Content.OutboundDialerPanel.Content.remove("close-button");
    // flex.AgentDesktopView.Panel2.OutboundDialerPanelNew.Content.remove("close-button");
    // flex.AgentDesktopView.Panel2.Content.OutboundDialerPanelNew.Content.remove("close-button");
    // flex.MainContainer.Content.remove("sidenav", {
    //   if : role => {return role == "admin"}
    // });

    // if(role == "admin"){
    //   flex.MainContainer.Content.remove("sidenav");
    // }

    // console.log("jhkgsdfjhglsudfkjhsd", flex.RootContainer.Content)
    // flex.TaskInfoPanel.defaultProps.uriCallback = (task) => {
    //   // return task 
    //   //   ? `https://bing.com/?q=${task.attributes.name}`
    //   //   : 'https://bing.com';
    // }
    let alertSound = new Audio("https://prune-labradoodle-5105.twil.io/assets/ring.mp3");
    alertSound.loop = true;

    const resStatus = ["accepted","canceled","rejected","rescinded","timeout"];

    manager.workerClient.on("reservationCreated", function(reservation) {
      debugger
      if (reservation.task.taskChannelUniqueName === 'voice') {
        alertSound.play()
      };
      resStatus.forEach((e) => {
        reservation.on(e, () => {
          alertSound.pause()
        });
      });
    });

  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
