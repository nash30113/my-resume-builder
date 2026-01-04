import { useState, useCallback } from 'react';
import type {
    ResumeData,
    PersonalInfo,
    WorkExperience,
    Education,
    Skill,
} from '../types/resume';
import {
    createEmptyResumeData,
    createEmptyWorkExperience,
    createEmptyEducation,
    createEmptySkill,
} from '../types/resume';

/**
 * 履歷表單狀態管理 Hook
 * 提供履歷資料的狀態管理與各種操作方法
 */
export function useResumeForm() {
    const [resumeData, setResumeData] = useState<ResumeData>(createEmptyResumeData());

    /**
     * 更新個人資訊
     */
    const updatePersonalInfo = useCallback((info: Partial<PersonalInfo>) => {
        setResumeData((prev) => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, ...info },
        }));
    }, []);

    /**
     * 新增工作經歷
     */
    const addWorkExperience = useCallback(() => {
        setResumeData((prev) => ({
            ...prev,
            workExperiences: [...prev.workExperiences, createEmptyWorkExperience()],
        }));
    }, []);

    /**
     * 更新工作經歷
     */
    const updateWorkExperience = useCallback((id: string, data: Partial<WorkExperience>) => {
        setResumeData((prev) => ({
            ...prev,
            workExperiences: prev.workExperiences.map((exp) =>
                exp.id === id ? { ...exp, ...data } : exp
            ),
        }));
    }, []);

    /**
     * 刪除工作經歷
     */
    const removeWorkExperience = useCallback((id: string) => {
        setResumeData((prev) => ({
            ...prev,
            workExperiences: prev.workExperiences.filter((exp) => exp.id !== id),
        }));
    }, []);

    /**
     * 新增教育背景
     */
    const addEducation = useCallback(() => {
        setResumeData((prev) => ({
            ...prev,
            educations: [...prev.educations, createEmptyEducation()],
        }));
    }, []);

    /**
     * 更新教育背景
     */
    const updateEducation = useCallback((id: string, data: Partial<Education>) => {
        setResumeData((prev) => ({
            ...prev,
            educations: prev.educations.map((edu) =>
                edu.id === id ? { ...edu, ...data } : edu
            ),
        }));
    }, []);

    /**
     * 刪除教育背景
     */
    const removeEducation = useCallback((id: string) => {
        setResumeData((prev) => ({
            ...prev,
            educations: prev.educations.filter((edu) => edu.id !== id),
        }));
    }, []);

    /**
     * 新增技能
     */
    const addSkill = useCallback(() => {
        setResumeData((prev) => ({
            ...prev,
            skills: [...prev.skills, createEmptySkill()],
        }));
    }, []);

    /**
     * 更新技能
     */
    const updateSkill = useCallback((id: string, data: Partial<Skill>) => {
        setResumeData((prev) => ({
            ...prev,
            skills: prev.skills.map((skill) =>
                skill.id === id ? { ...skill, ...data } : skill
            ),
        }));
    }, []);

    /**
     * 刪除技能
     */
    const removeSkill = useCallback((id: string) => {
        setResumeData((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill.id !== id),
        }));
    }, []);

    /**
     * 重置所有資料
     */
    const resetForm = useCallback(() => {
        setResumeData(createEmptyResumeData());
    }, []);

    return {
        resumeData,
        updatePersonalInfo,
        addWorkExperience,
        updateWorkExperience,
        removeWorkExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        resetForm,
    };
}
