import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../forms/CreateForm.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import AccordionDetails from '@mui/material/AccordionDetails';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import MenuItem from '@mui/material/MenuItem';
import SubjectIcon from '@mui/icons-material/Subject';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ShortTextIcon from '@mui/icons-material/ShortText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'; //fcrightup icon
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

function CreateForms() {
    const [questions, setQuestions] = useState(
        [{
            questionText: "Whitch is the capital city of karnataka?",
            questionType: "radio",
            options: [
                { optionText: "Bengaluru" },
                { optionText: "Belgavi" },
                { optionText: "Hubli" },
                { optionText: "mandya" }
            ],
            open: "true",
            required: false
        }]
    )
    function changeQuestion(text, i) {
        var newQuestion = [...questions];
        newQuestion[i].questionText = text;
        setQuestions(newQuestion);
        console.log(newQuestion);
    }
    function changeOptionValue(text, i, j) {
        var optionQuestion = [...questions];
        optionQuestion[i].options[j].optionText = text;
        setQuestions(optionQuestion);
        console.log(optionQuestion);
    }
    function removeOption(i, j) {
        var RemoveOptionQuestion = [...questions];
        if (RemoveOptionQuestion[i].options.length > 1) {
            RemoveOptionQuestion[i].options.splice(j, 1);
            setQuestions(RemoveOptionQuestion)
            console.log(i + "_" + j);
        }
    }
    function addOption(i) {
        var optionsOfQuestion = [...questions];
        if (optionsOfQuestion[i].options.length < 5) {
            optionsOfQuestion[i].options.push({ optionText: "Option" + (optionsOfQuestion[i].options.length + 1) })
        } else {
            console.log("Max 5 Options")
        }
        setQuestions(optionsOfQuestion);
    }
    function addQuestionType(i, type) {
        let qs = [...questions];
        console.log(type);
        qs[i].questionType = type;
        setQuestions(qs);
    }
    function copyQuestion(i) {
        //expandcloseAll();
        let qs = [...questions]
        var newQuestion = { ...qs[i] }
        // var newQuestion =qs[i]
        setQuestions([...questions, newQuestion])
    }
    function deleteQuestion(i) {
        let qs = [...questions];
        if (questions.length > 1) {
            qs.splice(i, 1);
        }
        setQuestions(qs);
    }
    function requiredQuestion(i) {
        var reqQuestion = [...questions];
        reqQuestion[i].required = !reqQuestion[i].required
        console.log(reqQuestion[i].required + "" + i);
        setQuestions(reqQuestion);
    }
    function addMoreQuestionField() {
        //expandcloseAll();
        setQuestions([...questions, { questionText: "Question", questionType: "radio", options: [{ optionText: "Option 1" }], open: true, required: false }]);
    }
    //function expandcloseAll() {
    //    let qs = [...questions];
    //    for (let j = 0; j < qs.length; j++) {
    //        qs[j].open = false;
    //    }
    //    setQuestions(qs);
    //}
    //function handleExpand(i) {
    //    let qs = [...questions];
    //    for (let j = 0; j < qs.length; j++) {
    //        if (i === j) {
    //            qs[i].open = true;
    //        } else {
    //            qs[j].open = false;
    //        }
    //    }
    //    setQuestions(qs);
    //}
    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        var itemgg = [...questions];
        const itemF = reorder(
            itemgg,
            result.source.index,
            result.destination.index
        );
        setQuestions(itemF);
    }
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };
    //get url id
    const id = useParams();

    console.log(id);
    //that always retuen the new element here
    function questionUI() {
        //console.log('aaaaaaaa', questions);
        return (
            questions.map((ques, i) => (

                //   <label>{ques.open}</label>
                <Draggable key={i} draggableId={i + 'id.id'} index={i} >
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps} >
                            <div>
                                <div style={{ marginBottom: "0px" }}>
                                    <div style={{ width: '100%', marginBottom: '0px' }}>
                                        <DragIndicatorIcon style={{
                                            transform: "rotate(-90deg)", color: '#DAE0E2',
                                            position: "relative", left: "300px"
                                        }}
                                            fontSize="small" />
                                    </div>
                                    <div>
                                        <Accordion expanded={questions[i].open} /* onChange={() => { handleExpand(i) }}*/ className={questions[i].open ? 'add border' : ""}>
                                            <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header" elevation={1} style={{ width: "100%" }} >
                                                {!questions[i].open ? (
                                                    <div className="saved_questions">
                                                        <Typography style={{ fontSize: "15px", fontWeight: "400", letterSpacing: '.1px', lineHeight: '24px', paddingBottom: "8px" }} >
                                                            {i + 1}. {questions[i].questionText}</Typography>
                                                        {ques.options.map((op, j) => (
                                                            <div key={j} >
                                                                <div style={{ display: 'flex', }}>
                                                                    <FormControlLabel style={{ marginleft: "5px", marginBottom: "5px" }} disabled control={<input type={ques.questionType}
                                                                        color="primary" style={{ marginRight: '3px', }} required={ques.type} />} label={
                                                                            <Typography style={{
                                                                                fontFamily: ' Roboto, Arial, sans-serif',
                                                                                fontsize: '13px',
                                                                                fontweight: '400',
                                                                                letterspacing: '.2px',
                                                                                lineHeight: ' 20px',
                                                                                color: '#202124'
                                                                            }}>
                                                                                (ques.options[j].optionText]
                                                                            </Typography>
                                                                        } />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : ""}
                                            </AccordionSummary>
                                            {questions[i].open ? (
                                                <div className="question_boxes">
                                                    <AccordionDetails className="add_question">
                                                        <div className="add_question_top">
                                                            <input type="text" className="question" placeholder="Question" value={ques.questionText} onChange={(e) => { changeQuestion(e.target.value, i) }}></input>
                                                            <CropOriginalIcon style={{ color: "a5f6368" }} />
                                                            <Select className="select" style={{ color: "#5f6368", fontSize: "13px" }}>
                                                                <MenuItem id="text" value="Text" onClick={() => { addQuestionType(i, "text") }}> <SubjectIcon style={{ marginRight: "10px" }} /> Paragraph</MenuItem>
                                                                <MenuItem id="checkbox" value="Checkbox" onClick={() => { addQuestionType(i, "checkbox") }}><CheckBoxIcon style={{ marginRight: "10px", color: "#78757" }} checked />Checkboxes</MenuItem>
                                                                <MenuItem id="radio" value="Radio" onClick={() => { addQuestionType(i, "radio") }}> <RadioButtonCheckedIcon style={{ marginRight: "10px", color: "#70757a" }} checked /> Multiple Choice </MenuItem>
                                                            </Select>
                                                        </div>
                                                        {ques.options.map((op, j) => (
                                                            <div className="add_question_body" key={j}>
                                                                {
                                                                    (ques.questionType != "text") ?
                                                                        <input type={ques.questionType} style={{ marginRight: "10px" }} /> :
                                                                        <ShortTextIcon style={{ marginRight: "10px" }} />
                                                                }
                                                                <div>
                                                                    <input type="text" className="text_input" placeholder="option" value={ques.options[j].optionText} onChange={(e) => { changeOptionValue(e.target.value, i, j) }}></input>
                                                                </div>
                                                                <CropOriginalIcon style={{ color: "#5f6368" }} />
                                                                <IconButton aria-label="delete">
                                                                    <CloseIcon onClick={() => { removeOption(i, j) }} />
                                                                </IconButton>
                                                            </div>
                                                        ))}
                                                        {ques.options.length < 5 ? (
                                                            <div className="add_question_body">
                                                                <FormControlLabel disabled control={
                                                                    (ques.questionType != "text") ?
                                                                        <input type={ques.questionType} color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                                            style={{ marginleft: "18px", marginRight: "10px" }} disabled /> :
                                                                        <ShortTextIcon style={{ marginRight: "10px" }} />
                                                                } label={
                                                                    <div>
                                                                        <input type="text" className="text_input" style={{ fontSize: "13px", width: "60px" }} placeholder="Add other"></input>
                                                                        <Button size="small" style={{ textTransform: 'none', color: "#4285f4", fontSize: "13px", fontWeight: "600" }} onClick={() => { addOption(i) }}>Add Option</Button>
                                                                    </div>
                                                                } />
                                                            </div>
                                                        ) : ""}
                                                        <div classhame="add_footer">
                                                            <div className="add_question_bottom_left">
                                                                <Button size="small" style={{ textTransform: 'none', color: "4a285Fa", fontsize: "13p", fontWeight: "600" }} >
                                                                    <ArrowOutwardIcon style={{ border: "2px solid #4285f4", padding: "2px", marginRIght: "8px" }} /> Answer key</Button>
                                                            </div>
                                                            <div className="add_question_bottom">
                                                                <IconButton arial-label="Copy" onClick={() => { copyQuestion(i) }}>
                                                                    <FilterNoneIcon />
                                                                </IconButton>
                                                                <IconButton arial-label="delete" onClick={() => { deleteQuestion(i) }}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                                <span style={{ color: "#5f6368", fontSize: "13px" }}>Required</span><Switch name="checkedA" color="primary" onClick={() => { requiredQuestion(i) }} />
                                                                <IconButton>
                                                                    <MoreVertIcon />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    </AccordionDetails>
                                                    <div className="question_edit">
                                                        <AddCircleIcon onClick={addMoreQuestionField} className="edit" />
                                                        <OndemandVideoIcon className="edit" />
                                                        <CropOriginalIcon className="edit" />
                                                        <TextFieldsIcon className="edit" />
                                                    </div>
                                                </div>) : ""}
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Draggable >
            ))
        )

    }
    return (
        <div>
            <div className="Question_form">
                <br></br>
                <div className="Section">
                    <div className="Question_title_Section">
                        <div className="Question_form_top">
                            <input type="text" className="question_form_top_name" style={{ color: "black" }} placeholder="Untitled document" />
                            <input type="text" className="question_form_top_desc" style={{ color: "black" }} placeholder="Form description" />
                        </div>
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {questionUI()}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                </div>
            </div>
        </div>
    );
}
export default CreateForms;
