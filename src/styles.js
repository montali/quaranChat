import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "flex-end",
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
  drawerPaper: {
    width: drawerWidth
  },
  hide: {
    display: "none"
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingBottom: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1)
  },
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: theme.spacing.unit
  },
  component_with_margin: {
    margin: theme.spacing(1)
  },
  gridList: {
    width: "100%",
    height: 640,
    backgroundColor: "#3f51b5"
  },
  message: {
    minWidth: "100%"
  },
  rightDrawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
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
    display: "block",
    width: "1280",
    height: "720"
  paper: {
    backgroundColor: theme.palette.text.paper
  }
}));

export { useStyles };
