import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Table, Tag } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons';
import { editAnnotation } from '../LabelPage/AnnotationSlice'
import { changeCurrentUsage } from '../LabelPage/PageSlice'

const TaskList = ({ sentences }) => {

    const dispatch = useDispatch()

    //设置注释高亮
    const handleHighlight = (text, selected, annotationColor) => {
        if (!selected) {
            return <span>{text}</span>;
        }
        const parts = text.split(new RegExp(`(${selected})`, 'gi'))
        return parts.map((part, i) =>
            part.toLowerCase() === selected.toLocaleLowerCase() 
            ? <mark className='hightlight' key={i} style={{backgroundColor: annotationColor}}>{part}</mark> 
            : <span key={i}>{part}</span>
        )
    }

    const onEdit = (id) => {
        console.log(id)
        dispatch(editAnnotation(id))
        dispatch(changeCurrentUsage('label'))
    }

    return(
        <>
            <Table 
                rowKey="id"
                dataSource={sentences}>
                <Table.Column
                title="ID"
                dataIndex="id"
                ></Table.Column>
                <Table.Column
                title="Text"
                render={sentence => (
                    <p>{handleHighlight(sentence.text, sentence.selectedText, sentence.annotationColor)}</p>
                )}
                ></Table.Column>
                <Table.Column
                title="Type"
                dataIndex="type"
                ></Table.Column>
                <Table.Column
                title="Tag"
                render={sentence => (
                    <Tag
                    color={sentence.tagColor}
                    >
                    <span>
                        {sentence.selectedTag}
                    </span>
                    </Tag>
                )}
                ></Table.Column>
                <Table.Column
                title="completed"
                render={sentence => (
                    sentence.isLabeled === true ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : ''
                )}
                ></Table.Column>
                <Table.Column
                title="action"
                render={(sentence) => (
                    <Button
                        type="primary"
                        onClick={() => onEdit(sentence.id)}
                    >
                        Edit
                    </Button>
                )}
                ></Table.Column>
            </Table>
        </>
    )
}

export default TaskList;
