// const WorkingColoured = (props) => {
//   const colouredSpan = (match, klass, text) => {
//     console.log(klass, text);
//     return <span className={klass}>{text}</span>;
//   }

//   const colour = (text, i) => {
//     const burst = text.split(/\[([\w-]*):([^\]]*)\]/);
//     return <p key={i}>
//       {burst[0]}
//       {for(let i=0; i<burst.length-1; i+=3) {

//       }}
//       {burst[burst.length - 1]}
//     </p>
//     return <p key={i}>{text.replace(/\[([\w-]*) ([^\]]*)\]/g, colouredSpan)}</p>;
//     //  text.match(/\[([\w-]*) (.*)\]/)

//   }

//   if (Array.isArray(props.data)) {
//     return (
//       <div className="box is-family-monospace">
//         {props.data.map((row, i) =>
//           <p key={i}>{colour(row, i)}</p>
//         )}
//       </div>
//     )
//   }

//   return null;
// }

// export default WorkingColoured;