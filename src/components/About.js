import React from 'react'

export const About = () => {
  return (
    <div><div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            What are we?
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            Welcome to <strong>Untitled Notebook</strong>, where organization and productivity meet simplicity and convenience. We understand the importance of capturing ideas, making to-do lists, and staying organized in today's fast-paced digital world. That's why we've created a powerful yet user-friendly note-taking solution to help you stay on top of your tasks, goals, and inspirations.


          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Developer
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <strong>Name: </strong> Aryan Shekhar
            <br />
            <strong>Github: </strong> <a target='_blank' href='https://github.com/aryanShekhar14'>Check Out</a>
          </div>
        </div>
      </div>

    </div></div>
  )
}
