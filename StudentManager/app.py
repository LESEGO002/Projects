from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database Model
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    course = db.Column(db.String(100), nullable=False)
    grade = db.Column(db.String(10), nullable=False)

# Create the database
with app.app_context():
    db.create_all()

# Routes
@app.route('/')
def index():
    students = Student.query.all()
    return render_template('index.html', students=students)

@app.route('/add', methods=['POST'])
def add_student():
    data = request.form
    new_student = Student(
        name=data['name'],
        age=int(data['age']),
        email=data['email'],
        course=data['course'],
        grade=data['grade']
    )
    db.session.add(new_student)
    db.session.commit()
    return redirect('/')

@app.route('/edit/<int:id>', methods=['POST'])
def edit_student(id):
    student = Student.query.get_or_404(id)
    data = request.form
    student.name = data['name']
    student.age = int(data['age'])
    student.email = data['email']
    student.course = data['course']
    student.grade = data['grade']
    db.session.commit()
    return redirect('/')

@app.route('/delete/<int:id>')
def delete_student(id):
    student = Student.query.get_or_404(id)
    db.session.delete(student)
    db.session.commit()
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
