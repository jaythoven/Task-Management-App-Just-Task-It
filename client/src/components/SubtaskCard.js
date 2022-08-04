import { Button, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

function SubtaskCard({ subtask, handleDelete, handleSubtaskComplete }) {
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
      };
    
    return (
    <div>
        <span id="singlesubtask">
            {/* <Checkbox onChange={onChange} onClick={()=>handleSubtaskComplete(subtask.id)}> */}
            <Button onClick={()=>handleDelete(subtask.id)} shape="round" icon={<DeleteOutlined  />} danger>
            {subtask.name}
            </Button>
            {/* </Checkbox> */}
        </span>
    </div>
    )
}

export default SubtaskCard;
