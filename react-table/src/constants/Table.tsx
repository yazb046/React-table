import React from 'react'
import {useTable} from 'react-table';
import '../index.css'

interface TableProps {
    columns: any[];
    data: any[];
}

const Table: React.FC<TableProps> = ({columns, data}) => {
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data});

    return (
      <div className='table-container'>
        <table className='table' {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row);
                return(
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                            <td {...cell.getCellProps()}>
                                {cell.render('Cell')}
                            </td>
                        ))}
                    </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    );


}

export default Table;




// export  type Person = {
//     id: number
//     firstName: string
//     lastName : string
//     position: 'manager' | 'saller' | 'office-manager' | 'project-manager'
//     salaryFond: number
//     coefficient1: number
//     coefficient2: number
//     coefficient3: number
//     result? : number
//     subRows?: Person[]
// }


// const range = (len: number) =>{
//     const arr = []
//     for (let i = 0; i < len; i++){
//         arr.push(i)
//     }
//     return arr
// }

// let _id = 1
// const id = () => _id++

// const newPerson = (): Person =>{

  
//     return{
//         id: id(),
//         firstName: faker.person.firstName(),
//         lastName: faker.person.lastName(),
//         position: faker.helpers.shuffle<Person['position']>([
//             'manager',
//             'saller',
//             'office-manager' ,
//             'project-manager',
//         ])[0]!,
//         salaryFond: faker.number.int(120000 ),
//         coefficient1: faker.number.int(1.2),
//         coefficient2: faker.number.int(1.5),
//         coefficient3: faker.number.int(2.5),
        
//     }
    
// }

// export function makeData(...lens: number[]) {
//     const makeDataLevel = (depth = 0): Person[] => {
//       const len = lens[depth]!
//       return range(len).map((): Person => {
//         return {
//           ...newPerson(),
//           subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
//         }
//       })
//     }
  
//     return makeDataLevel()
//   }


// export const COLUMNS = [
//     {
//         Header: 'Id',
//         accessor: 'id',
//     },

//     {
//         Header: "Full name",
//         columns:[
//             {
//                 Header: 'First Name',
//                 accessor: "first_name",
//             },
//             {
//                 Header: 'Last Name',
//                 accessor:"last_name",
//             },
//         ],
//     },
    
//     {
//         Header: "Information",
//         columns:[
//             {
//                 Header: "Status",
//                 accessor:'status',
//             },
//             {
//                 Header: "Salary fund",
//                 accessor:'salary_fund',
//             },
//             {
//                 Header:"Coefficient1",
//                 accessor:'coefficient1',
//             },
//             {
//                 Header:"Coefficient2",
//                 accessor:'coefficient2',
//             },
//             {
//                 Header:"Coefficient3",
//                 accessor:'coefficient3',
//             },
//             {
//                 Header:"Result",
//                 accessor:'result',
//             },
//         ]
//     },
    
// ];






