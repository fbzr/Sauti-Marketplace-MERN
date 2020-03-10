import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
    palette: {
       primary: {
          main: '#fe5043'
       },
       secondary: {
         main: '#303030',
         light: '#eee'
       },
       background: {
         default: "#eee"
       }
    },
    typography: { 
       useNextVariants: true
    }    
 });