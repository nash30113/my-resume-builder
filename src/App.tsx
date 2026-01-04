import { useRef } from 'react';
import { useResumeForm } from './hooks/useResumeForm';
import { Header } from './components/Header';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { WorkExperienceForm } from './components/WorkExperienceForm';
import { EducationForm } from './components/EducationForm';
import { SkillsForm } from './components/SkillsForm';
import { LanguagesForm } from './components/LanguagesForm';
import { SocialLinksForm } from './components/SocialLinksForm';
import { ResumePreview } from './components/ResumePreview';
import { PdfExportButton } from './components/PdfExportButton';
import './App.css';

/**
 * 履歷產生器主應用元件
 * 整合所有子元件，實作左右分割佈局
 */
function App() {
  const previewRef = useRef<HTMLDivElement>(null);

  const {
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
  } = useResumeForm();

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="content-wrapper">
          {/* 左側：表單輸入區域 */}
          <section className="form-panel">
            <div className="panel-header">
              <h2 className="panel-title">填寫履歷資訊</h2>
              <p className="panel-subtitle">輸入您的資訊，右側將即時預覽</p>
            </div>

            <div className="form-scroll">
              <PersonalInfoForm
                data={resumeData.personalInfo}
                onChange={updatePersonalInfo}
              />

              <WorkExperienceForm
                data={resumeData.workExperiences}
                onAdd={addWorkExperience}
                onUpdate={updateWorkExperience}
                onRemove={removeWorkExperience}
              />

              <EducationForm
                data={resumeData.educations}
                onAdd={addEducation}
                onUpdate={updateEducation}
                onRemove={removeEducation}
              />

              <SkillsForm
                data={resumeData.skills}
                onAdd={addSkill}
                onUpdate={updateSkill}
                onRemove={removeSkill}
              />

              <LanguagesForm
                data={resumeData.languages}
                onAdd={addLanguage}
                onUpdate={updateLanguage}
                onRemove={removeLanguage}
              />

              <SocialLinksForm
                data={resumeData.socialLinks}
                onAdd={addSocialLink}
                onUpdate={updateSocialLink}
                onRemove={removeSocialLink}
              />
            </div>
          </section>

          {/* 右側：履歷即時預覽 */}
          <section className="preview-panel">
            <div className="panel-header">
              <h2 className="panel-title">履歷預覽</h2>
              <PdfExportButton
                targetRef={previewRef}
                filename={resumeData.personalInfo.fullName
                  ? `${resumeData.personalInfo.fullName}_履歷表.pdf`
                  : '履歷表.pdf'}
              />
            </div>

            <div className="preview-scroll">
              <ResumePreview data={resumeData} previewRef={previewRef} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
