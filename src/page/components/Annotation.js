import React, { useEffect, useState } from 'react'
import { Button, Col, message, Row, Tag, Input, Radio } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { selectUnLabeledSentencesId, addSentenceType, selectSentencesById, selectEditSentenceId  } from '../LabelPage/AnnotationSlice'
import { addTag, changeCurrentUsage, deleteTag, selectAllTags, selectAllOptions } from '../LabelPage/PageSlice'

// const sentenceOptions = [
//     { label: 'Positive', value: 'Positive' },
//     { label: 'Negative', value: 'Negative' },
//     { label: 'Neutral', value: 'Neutral' },
// ];

const Annotation = () => {
    //设置整句分类
    const [sentenceType, setSentenceType] = useState('Positive')
    //设置选中标签
    const [selectedTag, setSelectTag] = useState('')
    //设置选中文本
    const [selectedText, setSelectedText] = useState('')
    //设置是否警告通知
    const [showUnselectError, setShowUnselectError] = useState(false)
    //设置自定义标签
    const [inputVisible, setInputVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')

    //获取未标注文本Id
    const unLabeledSentencesId = useSelector(state => selectUnLabeledSentencesId(state))
    //获取当前编辑文本Id
    const editSentenceId = useSelector(selectEditSentenceId)
    const sentencesId = editSentenceId ? [editSentenceId.id] : unLabeledSentencesId
    //获取当前标注文本
    const sentence = useSelector(state => selectSentencesById(state, sentencesId[0]))
    //获取标签选项
    const tags = useSelector(selectAllTags)
    //获取分类选项
    const sentenceOptions = useSelector(selectAllOptions)
    const dispatch = useDispatch()

    //设置整句分类
    const changeSentenceSort = ({ target: { value } }) => {
        setSentenceType(value)
    }

    //设置标签颜色
    const getTagColor = (tagName) => {
        const index = tags.indexOf(tagName)
        const colors = ['red', 'blue', 'green', 'orange', 'volcano']
        return colors[index % colors.length]
    }

    //设置选中标签
    const handleSelectedTag = (tag, checked) => {
        if(selectedTag === tag) {
        setSelectTag('')
        setSelectedText('')
        }else {
        const nextSelectedTag = checked ? tag : ''
        setSelectTag(nextSelectedTag)
        }
    }

    //处理展示input框
    const showInput = () => {
        setInputVisible(true)
    }

    //处理增加标签内容
    const handleInputChange = e => {
        setInputValue(e.target.value)
    }

    //处理增加标签
    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            dispatch(addTag(inputValue))
        }
        setInputVisible(false)
        setInputValue('')
    }

    //获取标注颜色
    const getAnnotationColorByName = (tagName) => {
        const index = tags.indexOf(tagName)
        const colors = ['#FF000033', '#305AD833', '#00800033', '#FFA50033', '#f9ceb688']
        return colors[index % colors.length]
    }

    //设置划线高亮
    const handleHighlight = (text, selected) => {
        const parts = text.split(new RegExp(`(${selected})`, 'gi'))
        const tagColor = getAnnotationColorByName(selectedTag)
        return parts.map((part, i) =>
        part.toLowerCase() === selected.toLocaleLowerCase() 
        ? <mark className='hightlight' key={i} style={{backgroundColor: tagColor}}>{part}</mark> 
        : <span key={i}>{part}</span>
        )
    }

    //设置提交
    const onSubmit = () => {
        if(selectedTag && !selectedText) {
            setShowUnselectError(true)
            return
        }
        dispatch(addSentenceType({ id: sentence.id, selectedText: selectedText, type: sentenceType, selectedTag: selectedTag, tagColor: getTagColor(selectedTag), annotationColor: getAnnotationColorByName(selectedTag) }))
        setSelectedText('')
        if (sentencesId.length <= 1) {
            alert("No more sentences!")
            dispatch(changeCurrentUsage('task'))
        }
    }

    //处理未选中标记文本情况
    useEffect(() => {
        if(showUnselectError) {
        message.error('Selected text is null')
        setShowUnselectError(false)
        }
    }, [showUnselectError])

    //处理鼠标选中监听
    useEffect(() => {
    //获取选中文本
        const getSelectedText = () => {
            if (!selectedTag) return
            //获取被选中区域节点
            const selection = window.getSelection()
            if (!selection.rangeCount) return
            const range = selection.getRangeAt(0)
            const selectedText = range.toString()
            if (selectedText) {
                setSelectedText(selectedText)
            }
        }
        document.addEventListener('mouseup', getSelectedText)
        document.addEventListener('touchend', getSelectedText)

        return () => {
        document.removeEventListener('mouseup', getSelectedText)
        document.removeEventListener('touchend', getSelectedText)
        }
    }, [selectedTag])

    return (
        <Row>
            <div style={{ padding: '20px 20px'}}>
                <Row>
                    <Radio.Group options={sentenceOptions} onChange={changeSentenceSort} value={sentenceType} />
                </Row>
                <p>{handleHighlight(sentence.text, selectedText)}</p>
                <Row gutter={[8]}>
                    {tags.map((tag, index) => {

                        const isLongTag = tag.length > 20
                        const isSelected = selectedTag === tag

                        return (
                            <Col key={tag} style={{marginTop: "10px"}}>
                              <Tag
                                color={getTagColor(tag)}
                                closable={index !== 0}
                                onClose={() => dispatch(deleteTag(tag)) }
                                onClick={(checked) => handleSelectedTag(tag, checked)}
                                style={{
                                  transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                                  fontWeight: isSelected ? '800' : 'normal',
                                }}
                              >
                                <span>
                                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                </span>
                              </Tag>
                            </Col>
                          )
                    })}
                </Row>

                <Row style={{margin: "10px 0"}}>
                    {inputVisible && (
                        <Input
                        size="small"
                        className="tag-input"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                        />
                    )}

                    {!inputVisible && (
                        <Tag className="site-tag-plus" onClick={showInput}>
                            Add New Tag
                        </Tag>
                    )}
                </Row>
                <div><Button onClick={onSubmit} type='primary'>Submit</Button></div>
            </div>
        </Row>
    )

}

export default Annotation