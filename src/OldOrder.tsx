import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from 'react';
import { orderList } from './Services';
import { Basket, IOrder, Result,Rows } from './models/IOrder';





function CollapsibleTable() {
 
   
  function createData(id?:number, createdDate?: string,total?:number,baskets?:Basket[])
  {
     
     
       return {
        id,
         createdDate,
         total,
         baskets
     
       };
     }
  

  
  const [rows, setrows] = useState< Rows[]>([])
  
 
  useEffect(() => {
    const formatYmd = (date:any) => date.toISOString().slice(0, 10);
    orderList().then(res=>{
      const fulldata:IOrder=res.data
      const result=fulldata.result!
     const arr:Rows[]=[];
     // setorderArray(result)
  
      result.map((item)=>{
        const long = item.createdDate;
      
        const d = new Date(long!);
        console.log(d)
        var ds = formatYmd(d).toString();
         
        console.log(ds)
      
        arr.push( (createData(item.id,ds,item.total!,item.baskets! )))
        
      })
      setrows(arr)

      console.log(rows)
  
    }).catch((Error=>{
      console.log(Error)
    }))
      
    }, [])
  
    
   


    function Row(props: { row: ReturnType<typeof createData> }) {

      

      const { row } = props;
      const [open, setOpen] = React.useState(false);
    
    
      
    
      return (
        < >

<React.Fragment>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="right">
              {row.createdDate}
            </TableCell>
            <TableCell align="right">{row.total}</TableCell>
          
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                   Detail
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Price</TableCell>
                       
                        <TableCell align="right"> Quantity</TableCell>
                       
                        <TableCell align="right">Sub Total ($)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.baskets!.map((basket) => (
                        <TableRow key={basket.id!}>
                          <TableCell component="th" scope="row">
                            {basket.product?.name}
                          </TableCell>
                          <TableCell>{basket.product?.price}</TableCell>
                          <TableCell align="right">{basket.quantity}</TableCell>
                          <TableCell align="right">
                            {Math.round(basket.quantity! * basket.product?.price! *100) / 100}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
        </>
    
      );
    }
    

  return (
    <>
    <TableContainer component={Paper}>
       <Table aria-label="collapsible table">
        <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Order Number </TableCell>
          <TableCell align="right">Created Date </TableCell>
          <TableCell align="right">Total ($)</TableCell>
          
        </TableRow>
      </TableHead>
      <TableBody>
      {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
      </TableBody>
     
    </Table>
  </TableContainer>
 


    </>
   
   
  
);
   
  
}

export default   CollapsibleTable













