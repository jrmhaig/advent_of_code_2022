import BaseSolution from './BaseSolution'
import WorkingSimple from '../components/working/Simple';

class Day07Solution extends BaseSolution {
  constructor() {
    super(7);
    this.solved = true;
  }

  partOne(data) {
    const working = [];
    const root = this.buildStructure(data, working);

    data.setSolution(root.catalogue.filter(dir => {
      working.push(`Directory ${dir.name}: ${dir.size()}`);
      return dir.size() <= 100000;
    }).reduce((total, dir) => total + dir.size(), 0));

    data.setWorking(<WorkingSimple data={working} />);
  }

  partTwo(data) {
    const working = [];
    const root = this.buildStructure(data, working);

    working.push(`Available space: ${70000000 - root.size()}`);
    const required = root.size() - 40000000;
    working.push(`Space required: ${required}`);
    const candidates = root.catalogue.filter(dir => dir.size() >= required);
    working.push('Candidates:');
    data.setSolution(Math.min(...candidates.map(dir => {
      working.push(`Directory ${dir.name}: ${dir.size()}`);
      return dir.size();
    })));

    data.setWorking(<WorkingSimple data={working} />);
  }

  buildStructure(data, working) {
    const commands = data.inputData.split(/\$ /).filter(row => !row.match(/^\s*$/));

    const root = new Day07Directory({ name: '(root)' });
    let pwd = root;
    pwd.mkdir('/');

    commands.forEach(command => {
      const rows = command.split(/\r?\n/);
      const match = rows.shift().match(/(cd|ls)\s*(.*)$/);
      if (match[1] === 'cd') {
        working.push(`Changing directory to ${match[2]}`);
        if (match[2] === '..') {
          pwd = pwd.up();
        } else {
          pwd = pwd.fetch(match[2]);
        }
      } else {
        working.push(`Listing directory ${pwd.name}`);
        rows.forEach(row => {
          const file = row.match(/^(.*) (.*)$/);
          if (file) {
            if (file[1] === 'dir') {
              working.push(`This is a directory: ${file[2]}`);
              pwd.mkdir(file[2]);

            } else {
              working.push(`The file ${file[2]} has size ${file[1]}`);
              pwd.add(new Day07File({ name: file[2], size: +file[1] }));
            }
          } else {
            working.push(`Could not match ${row}`);
          }
        })
      }
      working.push('---------------------');
    })
    return root;
  }
}

class Day07File {
  constructor({ name, size }) {
    this.name = name;
    this._size = size;
  }

  size() { return this._size; }
}

class Day07Directory {
  constructor({ name, parent }) {
    this.name = name;
    this.parent = parent;
    this.contents = [];
    this.catalogue = this.parent ? this.parent.catalogue : [];
    this.catalogue.push(this);
  }

  add(file) {
    this.contents.push(file);
  }

  mkdir(dir) {
    const newDir = new Day07Directory({ name: dir, parent: this });
    this.contents.push(newDir);
  }

  fetch(name) {
    return this.contents.find(file => file.name === name);
  }

  up() {
    return this.parent;
  }

  size() {
    return this.contents.reduce((total, file) => total + file.size(), 0);
  }
}

export default Day07Solution;
