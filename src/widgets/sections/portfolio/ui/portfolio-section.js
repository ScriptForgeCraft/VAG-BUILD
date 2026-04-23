import { projects } from "../../../../entities/project/model/projects.js";
import { escapeHtml } from "../../../../shared/lib/html.js";
import { createI18nAltAttributes, createI18nTextAttributes } from "../../../../shared/lib/i18n.js";
import { renderButton } from "../../../../shared/ui/button.js";

export function renderPortfolioSection() {
  return `
    <section class="section portfolio" id="portfolio" aria-labelledby="portfolio-title">
      <div class="container">
        <div class="portfolio__header reveal">
          <div>
            <h2
              id="portfolio-title"
              ${createI18nTextAttributes({
                am: "Մեր աշխատանքները",
                ru: "Наши проекты",
                en: "Our Projects",
              })}
            >
              Մեր աշխատանքները
            </h2>
          </div>
          ${renderButton({
            href: "#contacts",
            label: {
              am: "Ուզում եմ նույնը",
              ru: "Хочу так же",
              en: "I want this",
            },
            variant: "secondary",
          })}
        </div>

        <div class="portfolio__grid">
          ${projects
            .map(
              (project) => `
                <article class="project-card reveal">
                  <div class="project-card__media">
                    <img
                      src="${project.image}"
                      width="${project.imageWidth}"
                      height="${project.imageHeight}"
                      ${createI18nAltAttributes(project.title)}
                      alt="${escapeHtml(project.title.am)}"
                      decoding="async"
                      loading="lazy"
                      referrerpolicy="no-referrer"
                    />
                    <span class="project-card__type" ${createI18nTextAttributes(project.type)}>${escapeHtml(project.type.am)}</span>
                  </div>
                  <div class="project-card__body">
                    <div class="project-card__topline">
                      <h3 ${createI18nTextAttributes(project.title)}>${escapeHtml(project.title.am)}</h3>
                      <span ${createI18nTextAttributes(project.duration)}>${escapeHtml(project.duration.am)}</span>
                    </div>
                    <p ${createI18nTextAttributes(project.description)}>${escapeHtml(project.description.am)}</p>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}
