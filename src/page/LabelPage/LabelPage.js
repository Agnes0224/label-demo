import React, { useEffect, useState } from 'react'
import { Button, Col, Progress, Row } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSentences, selectAllSentences, selectUnLabeledSentencesId, selectLabeledSentences } from './AnnotationSlice'
import { changeCurrentUsage } from './PageSlice'

import TaskList from '../components/TaskList'
import Annotation from '../components/Annotation'

const LabelPage = () => {
    //设置按钮文字切换
    const [buttonText,setButtonText] = useState('Start')
    //设置进度条
    const [progress,setProgress] = useState(0)

    const dispatch = useDispatch()

    //获取当前页面用途
    const currentUsage = useSelector(state => state.page.currentUsage)
    // console.log(currentUsage)

    //获取标注文本信息
    const sentences = useSelector(selectAllSentences)
    const labeledSentences = useSelector(selectLabeledSentences)
    const sentenceStatus = useSelector(state => state.sentence.status)
    const sentencesId = useSelector(selectUnLabeledSentencesId)

    //开始标注
    const startLabeling = () => {
        if(sentencesId.length > 0){
            dispatch(changeCurrentUsage('label'))
        } else {
            alert('There is no task to do!')
        }
    }
    const backToTaskList = () => {
        dispatch(changeCurrentUsage('task'))
    } 
    const onChange = () => {
        if (currentUsage === 'task'){
            startLabeling()
        } else {
            backToTaskList()
        }
    }

    //更新按钮
    useEffect(() => {
        if(currentUsage === 'task'){
            setButtonText('Start')
        }else {
            setButtonText('Back')
        }
    }, [currentUsage])

    //更新进度条
    useEffect(() => {
        setProgress((labeledSentences / sentences.length) * 100)
    }, [ labeledSentences, sentences.length])

    //拉取标注任务
    useEffect(() => {
        if(sentenceStatus === 'idle') {
          dispatch(fetchSentences())
        }
    }, [sentenceStatus, dispatch])

    const layout = {lg: 4, md: 16 }


    return(
        <Row>
            <Col span={24} style={{ padding: '20px 20px', backgroundColor: '#fff' }}>
                <Row>
                    <Col {...layout}>
                    <h2>标记任务列表</h2>
                    </Col>
                    <Col {...layout} style={{ margin: "20px" }}>
                    <Button type="primary" onClick={onChange}>{buttonText}</Button>
                    </Col>
                </Row>
                <Col style={{ marginBottom: "16px" }}>
                    <Progress percent={progress} size={[300, 20]} />
                </Col>

                {(() => {
                    switch (currentUsage) {
                        case 'task':
                            return <TaskList sentences={sentences} />
                        case 'label':
                            return <Annotation />
                        default:
                            return null
                    }
                }) ()}
            </Col>
        </Row>
    )
}

export default LabelPage;
