# Template Modifier

Create templates and edit them from browser

## Dependencies

### Ubuntu

- `sudo apt install sassc`

### Mac OS

- `brew install sassc`

## Instalation

- Fork this project
- Clone forked repository to your machine
- cd into project folder
- Run `chmod +x build`
- Run `chmod +x create_template`

## Create new Template

- Run `./create_template your_template_name`
- Code your template in the files created inside `templates/your_template_name` folder
- Run `./build` on root folder
- `git add templates/index.js templates/style.css templates/your_template/style.css`
- `git commit -m "New template"`
- `git push`

## Usage

- Choose a template
- Edit it
- Copy code to clipboard
- Paste it anywhere