import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 320;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    height: "100vh"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  space_under_toolbar: {
    minHeight: 90
  },
  mobile_toolbar: {
    minHeight: 34
  },
  drawerPaper: {
    width: drawerWidth
  },
  hide: {
    display: "none"
  },
  content: {
    height: "85%",
    flexGrow: 1,
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6)
  },
  mobile_content: {
    height: "85%",
    flexGrow: 1,
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0)
  },
  button: {
    margin: theme.spacing(1)
  },
  component_with_margin: {
    margin: theme.spacing(1)
  },
  gridList: {
    height: "85%",
    width: "100%",
    backgroundImage:
      'url("https://telegram.org/file/464001326/1/eHuBKzF9Lh4.288899/1f135a074a169f90e5")'
  },
  message: {
    minWidth: "100%"
  },
  rightDrawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  videoCallDiv: {
    position: "fixed",
    zIndex: 999,
    width: "100%",
    height: "100%",
    textAlign: "center",
    top: 0,
    left: 0,
    background: "rgba(0, 0, 0, 0.8)"
  },
  videoStream: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "auto",
    marginTop: "auto",
    display: "block"
  },
  paper: {
    backgroundColor: theme.palette.text.paper
  },
  textbox: {
    maxWidth: 180
  },
  message_input: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  divider: {
    height: 28,
    margin: 4
  },
  title: {
    flexGrow: 1
  },
  logout: {
    color: "white"
  }
}));

export { useStyles };
