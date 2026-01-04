import { useState, useCallback } from 'react';
import type {
    ResumeData,
    PersonalInfo,
    WorkExperience,
    Education,
    Skill,
    Language,
    SocialLink,
} from '../types/resume';
import {
    createEmptyResumeData,
    createEmptyWorkExperience,
    createEmptyEducation,
    createEmptySkill,
    createEmptyLanguage,
    createEmptySocialLink,
} from '../types/resume';
import { dummyResumeData } from '../data/dummyData';

/**
 * 履歷表單狀態管理 Hook
 * 提供履歷資料的狀態管理與各種操作方法
 * NOTE: 預設載入範例資料以展示完整排版效果
 */
export function useResumeForm() {
    const [resumeData, setResumeData] = useState<ResumeData>(dummyResumeData);

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
     * 新增語言能力
     */
    const addLanguage = useCallback(() => {
        setResumeData((prev) => ({
            ...prev,
            languages: [...prev.languages, createEmptyLanguage()],
        }));
    }, []);

    /**
     * 更新語言能力
     */
    const updateLanguage = useCallback((id: string, data: Partial<Language>) => {
        setResumeData((prev) => ({
            ...prev,
            languages: prev.languages.map((lang) =>
                lang.id === id ? { ...lang, ...data } : lang
            ),
        }));
    }, []);

    /**
     * 刪除語言能力
     */
    const removeLanguage = useCallback((id: string) => {
        setResumeData((prev) => ({
            ...prev,
            languages: prev.languages.filter((lang) => lang.id !== id),
        }));
    }, []);

    /**
     * 新增社群連結
     */
    const addSocialLink = useCallback(() => {
        setResumeData((prev) => ({
            ...prev,
            socialLinks: [...prev.socialLinks, createEmptySocialLink()],
        }));
    }, []);

    /**
     * 更新社群連結
     */
    const updateSocialLink = useCallback((id: string, data: Partial<SocialLink>) => {
        setResumeData((prev) => ({
            ...prev,
            socialLinks: prev.socialLinks.map((link) =>
                link.id === id ? { ...link, ...data } : link
            ),
        }));
    }, []);

    /**
     * 刪除社群連結
     */
    const removeSocialLink = useCallback((id: string) => {
        setResumeData((prev) => ({
            ...prev,
            socialLinks: prev.socialLinks.filter((link) => link.id !== id),
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
        addLanguage,
        updateLanguage,
        removeLanguage,
        addSocialLink,
        updateSocialLink,
        removeSocialLink,
        resetForm,
    };
}
