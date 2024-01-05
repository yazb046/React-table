
import React from 'react';
import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Table from '../src/constants/Table';
import './App.css';


interface Data {
  id: number;
  name: string;
  surname: string;
  baseSalary: number;
  kpi1: number;
  kpi2: number;
  kpi3: number;
  total: number;
  [key: string]: any;
}

const App: React.FC = () => {
  const [data, setData] = React.useState<Data[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/list');
        const updatedData = response.data.map((item: Data) => ({
          ...item,
          total: item.baseSalary * (item.kpi1 + item.kpi2 + item.kpi3),
        }));
        setData(updatedData);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  const updateData = (rowIndex: number, columnId: string, value: any) => {
    const updatedData = [...data];
    updatedData[rowIndex][columnId] = value;

    if(['baseSalary', 'kpi1', 'kpi2', 'kpi3'].includes(columnId)) {
      const updatedTotal = 
      updatedData[rowIndex].baseSalary *
      (
        updatedData[rowIndex].kpi1 +
        updatedData[rowIndex].kpi2 +
        updatedData[rowIndex].kpi3
      );
      updatedData[rowIndex].total = updatedTotal
    }
    setData(updatedData);
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Имя',
        accessor: 'name',
      },
      {
        Header: 'Фамилия',
        accessor: 'surname',
      },
      {
        Header: 'Базовая Зарплата',
        accessor: 'baseSalary',
      },
      {
        Header: 'KPI 1',
        accessor: 'kpi1',
      },
      {
        Header: 'KPI 2',
        accessor: 'kpi2',
      },
      {
        Header: 'KPI 3',
        accessor: 'kpi3',
      },
      {
        Header: 'Итого',
        accessor: 'total',
      },
    ],
    []
  );

  return (
    <div>
      <Table columns={columns} data={data} updateData={updateData}/>
    </div>
  );
};





// import {
//   Column,
//   Table,
//   ColumnDef,
//   useReactTable,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   flexRender,
//   RowData,
// } from '@tanstack/react-table'

// import {makeData, Person} from './constants/Columns'

// import './App.css'



// declare module '@tanstack/react-table' {
//   interface TableMeta<TData extends RowData> {
//     updateData: (rowIndex: number, columnId: string, value: unknown) => void
//   }
// }



// // Редактирования данных в ячейках
// const defaultColumn: Partial<ColumnDef< Person>> = {
//   cell: ({ getValue, row: { index }, column: { id }, table }) => {
//     const initialValue = getValue()

//     // Для сохранения и обновления данных в ячейках
//     const [value, setValue] = React.useState(initialValue)

   
//     const onBlur = () => {
//       table.options.meta?.updateData(index, id, value)
//     }

//     // Синхронизация с состоянием данных при изменении начального значения этих данных
//     React.useEffect(() => {
//       setValue(initialValue)
//     }, [initialValue])

//     return (
//       <input
//         value={value as string}
//         onChange={e => setValue(e.target.value)}
//         onBlur={onBlur}
//       />
//     )
//   },
// }


// function useSkipper(){
//   const shouldSkipRef = React.useRef(true)
//   const shouldSkip = shouldSkipRef.current


//   const skip = React.useCallback(() =>{
//     shouldSkipRef.current = false
//   }, [])

//   React.useEffect(() =>{
//     shouldSkipRef.current = true
//   })
//   return [shouldSkip, skip] as const
// }



// function App(){
  

//   const rerender = React.useReducer(() => ({}), {})[1]

//   const columns_to_sum = ['salaryFond', 'coefficient1', 'coefficient2', 'coefficient3']

//   const columns = React.useMemo<ColumnDef<Person>[]>(
//     () => [
//       {
//         header: 'ID',
//         footer: props => props.column.id,
//       },
//       {
//         header: "Name",
//         footer: props => props.column.id,
//         columns:[
//           {
//             accessorKey: 'firstName',
//             footer: props => props.column.id,
//           },
//           {
//             accessorFn: row => row.lastName,
//             id: 'lastName',
//             header: () => <span>Last Name</span>,
//             footer: props => props.column.id,
//           },
//         ],
//       },
//       {
//         header: 'Information',
//         footer: props => props.column.id,
//         columns:[
//           {
//             accessorKey: 'position',
//             header: () => 'Position',
//             footer: props => props.column.id,
//           },
//           {
//             accessorKey: 'salaryFond',
//             header: () => <span>Salary fond</span>,
//             footer: props => props.column.id,
//           },
//           {
//             accessorKey: 'coefficient1',
//             header: () => <span>coefficient1</span>,
//             footer: props => props.column.id,
//           },
//           {
//             accessorKey: 'coefficient2',
//             header: () => <span>coefficient2</span>,
//             footer: props => props.column.id,
//           },
//           {
//             accessorKey: 'coefficient3',
//             header: () => <span>coefficient3</span>,
//             footer: props => props.column.id,
//           },
//           {
//             accessorKey: 'result',
//             header: () => <span>Result</span>,
//             footer: props => props.column.id,
//             Cell: (rowData: TData) => {
//               columns_to_sum.reduce((salaryFond, coefficient1) => salaryFond + rowData.row[coefficient1] || 0,0)
//             }
//           },
//         ],
//       },
//     ],
//   )


//   const [data, setData] = React.useState(() => makeData(1000))
//   const refreshData = () => setData(() => makeData(1000))

//   const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

//   const table = useReactTable({
//     data,
//     columns,
//     defaultColumn,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     autoResetPageIndex,
//     meta:{
//       updateData: (rowIndex, columnId, value) =>{

//         skipAutoResetPageIndex()
//         setData(old =>
//           old.map((row, index) => {
//             if (index === rowIndex){
//               return{
//                 ...old[rowIndex]!,
//                 [columnId]: value,
//               }
//             }
//             return row
//           })
//           )
//       },
//     },
//     debugTable: true,
//   })

//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response: AxiosResponse<Person[]> = await axios.get('http://localhost:8080/api/list');
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return(
//     <div className='p-2'>
//       <div className='h-2'></div>
//       <table>
//         <thead>
//           {table.getHeaderGroups().map(headerGroup =>(
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map(header => {
//                 return(
//                   <th key={header.id} colSpan={header.colSpan}>
//                     {header.isPlaceholder ? null : (
//                       <div>
//                         {flexRender(
//                           header.column.columnDef.header, 
//                           header.getContext()
//                         )}
//                       </div>
//                     )}
//                   </th>
//                 )
//               })}
//             </tr>
//           ))}
//         </thead>
        
//         <tbody>

//           {table.getRowModel().rows.map(row => {
//             return(
//               <tr key={row.id}>
//                 {row.getVisibleCells().map(cell =>{
//                   return(
//                     <td key= {cell.id}>

//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )
//                       }
//                     </td>
                    
                    
//                   )
//                 })}
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>
//       <div className="h-2" />
//       <div className="flex items-center gap-2">
//         <button
//           className="border rounded p-1"
//           onClick={() => table.setPageIndex(0)}
//           disabled={!table.getCanPreviousPage()}
//         >
//           {'<<'}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           {'<'}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           {'>'}
//         </button>
//         <button
//           className="border rounded p-1"
//           onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//           disabled={!table.getCanNextPage()}
//         >
//           {'>>'}
//         </button>
//         <span className="flex items-center gap-1">
//           <div>Page</div>
//           <strong>
//             {table.getState().pagination.pageIndex + 1} of{' '}
//             {table.getPageCount()}
//           </strong>
//         </span>
//         <span className="flex items-center gap-1">
//           | Go to page:
//           <input
//             type="number"
//             defaultValue={table.getState().pagination.pageIndex + 1}
//             onChange={e => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0
//               table.setPageIndex(page)
//             }}
//             className="border p-1 rounded w-16"
//           />
//         </span>
//         <select
//           value={table.getState().pagination.pageSize}
//           onChange={e => {
//             table.setPageSize(Number(e.target.value))
//           }}
//         >
//           {[10, 20, 30, 40, 50].map(pageSize => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>{table.getRowModel().rows.length} Rows</div>
//       <div>
//         <button onClick={() => rerender()}>Force Rerender</button>
//       </div>
//       <div>
//         <button onClick={() => refreshData()}>Refresh Data</button>
//       </div>
//     </div>
//   )

 
// }



export default App
