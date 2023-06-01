// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
 * @title Smart Degres - A blockchain based solution to prevent counterfeit university degrees.
 * @author Shubham Gulati and Tómas Quintana; Cloud Computing and Blockchain, Saskatchewan Polytechnic.
 * @dev Last Updated: April 23, 2023.
 */

/**
 * Functions available in this smart contract:
 * 1. Registeration for universities, programs, and students. And student enrollment into university, and a program.
 * 2. A university issuing degrees to its students.
 * 3. A third party verifying the student's degree details using the degree id.
 */
contract SmartDegree {
    /**
     * Define the structure of a student.
     * @param studentAddress is the public address of the student's account.
     * @param firstName is the first name of the student.
     * @param lastName is the last name of the student.
     * @param universityAddress is the public address of the university where student will be enrolled.
     * @param isEnrolled will store the university enrollment status of the student. It will be true when the student is enrolled in a university.
     * @param isActive is the active/inactive status of the student in the system.
     * @notice the public address of the student's account is the primary key for each student.
     */
    struct Student {
        address studentAddress;
        string firstName;
        string lastName;
        address universityAddress;
        bytes32 programId;
        bool isEnrolled;
        bool isActive;
    }

    /**
     * Define the structure of a university.
     * @param universityAddress is the public address of the university's account.
     * @param name is the legal name of the university.
     * @param country is the country of establishment of the university.
     * @param isActive is the active/inactive status of the university in the system.
     * @notice the public address of the university's account is the primary key for each university.
     */
    struct University {
        address universityAddress;
        string name;
        string country;
        bool isActive;
    }

    /**
     * Define the structure of a university program.
     * @param programId is a hash value of the combination of title, field, and universityAddress.
     * @param title is the name of the program, for example Cloud Computing and Blockchain.
     * @param field is the field of study, for example Computer Science and Engineering.
     * @param universityAddress is the public address of the university to which the program belongs to.
     * @param isActive the active/inactive status of the program in the system.
     * @notice programId is the primary key for each program.
     */
    struct Program {
        bytes32 programId;
        string title;
        string field;
        address universityAddress;
        bool isActive;
    }

    /**
     * Define the structure of an issued degree.
     * @param issuedDegreeId is a hash value of the combination of studentAddress and programId.
     * @param studentAddress is the public address of the student to whom the degree is issued to.
     * @param programId is the primary key of the catalog which is completed by the student.
     * @param issuedAt is the time at which the degree was issued.
     * @notice issuedDegreeId is the primary key for each program.
     */
    struct IssuedDegree {
        bytes32 issuedDegreeId;
        address studentAddress;
        string firstName;
        string lastName;
        string university;
        string country;
        bytes32 programId;
        uint256 issuedAt;
    }

    /**
     * Define the structure of degree validation response.
     * @param issuedDegreeId is the primary key of the dissued degree.
     * @param studentAddress is the public address of the student to whom the degree is issued to.
     * @param firstName is the first name of the student.
     * @param lastName is the last name of the student.
     * @param university is the name of the university.
     * @param country is the country of establishment of the university.
     * @param programId is the primary key of the program which is completed by the student.
     * @param issuedAt is the time at which the degree was issued.
     */
    struct ValidationResponse {
        bytes32 issuedDegreeId;
        address studentAddress;
        string firstName;
        string lastName;
        string university;
        string country;
        bytes32 programId;
        uint256 issuedAt;
    }

    /**
     * Define set of students, universities, programs, and issued degrees.
     * Define counts for each mapping to be able to track their length.
     */
    mapping(address => University) universities;
    address[] universityAddresses;

    mapping(bytes32 => Program) programs;
    bytes32[] programIds;

    mapping(address => Student) students;
    address[] studentAddresses;

    mapping(bytes32 => IssuedDegree) issuedDegrees;
    bytes32[] issuedDegreeIds;

    /**
     * Store the address of the owner of the smart contract in the contract storage.
     */
    address owner;

    /**
     * Error types used in the smart contract.
     */
    error InvalidDegreeError(string message);

    /**
     * Default constructor to initialize the smart contract.
     * Sets the address of the account deploying the smart contract to the owner variable.
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * Function 1(a) - Register a university.
     * @notice Only the contract owner can create a new university.
     * @param _universityAddress is the public address of the new university.
     * @param _universityName is the legal name of the new university.
     * @param _universityCountry is the country of establishment of the new university.
     * @return University object.
     */
    function registerUniversity(
        address _universityAddress,
        string memory _universityName,
        string memory _universityCountry
    ) public returns (University memory) {
        require(
            msg.sender == owner,
            "Only the contract owner is allowed to create a new university."
        );
        require(
            universities[_universityAddress].isActive == false,
            "Cannot create duplicate university. Given university already exists and is active."
        );

        universities[_universityAddress] = University(
            _universityAddress,
            _universityName,
            _universityCountry,
            true
        );
        universityAddresses.push(
            universities[_universityAddress].universityAddress
        );

        return universities[_universityAddress];
    }

    /**
     * Function 1(b) - Return a list of universities.
     * @return University[]
     */
    function getUniversities() public view returns (University[] memory) {
        University[] memory response = new University[](
            universityAddresses.length
        );
        for (uint256 i = 0; i < universityAddresses.length; i++) {
            response[i] = universities[universityAddresses[i]];
        }
        return response;
    }

    /**
     * Function 1(c) - Register a program.
     * @notice Only a active university account can create a new program. The new program will only belong to the university creating it.
     * @param _title is the name of the new program. Example: Cloud Computing and Blockchain.
     * @param _field is the name of the field of study for the new program. Example: Computer Science and Engineering.
     * @return Program object.
     */
    function registerProgram(
        string memory _title,
        string memory _field
    ) public returns (Program memory) {
        require(
            universities[msg.sender].isActive == true,
            "University inactive or does not exist."
        );

        bytes32 programId = keccak256(abi.encode(_title, _field, msg.sender));

        require(
            programs[programId].isActive == false,
            "Program is already registered for your university."
        );

        programIds.push(programId);
        programs[programId] = Program(
            programId,
            _title,
            _field,
            msg.sender,
            true
        );

        return (programs[programId]);
    }

    /**
     * Function 1(d) - Return a list of programs for a university.
     * @return Program[]
     */
    function getProgramsForUniversity(
        address _universityAddress
    ) public view returns (Program[] memory) {
        Program[] memory response = new Program[](programIds.length);
        for (uint256 i = 0; i < programIds.length; i++) {
            Program memory program = programs[programIds[i]];
            if (program.universityAddress == _universityAddress) {
                response[i] = program;
            }
        }
        return response;
    }

    /**
     * Function 1(e) - Register a student.
     * Initially, the student will not be assigned to a university so the initial isEnrolled value will be false.
     * Initially, the university address for the student will be set to 0.
     * @notice The owner of the contract cannot be a student at any university.
     * @notice The university and the student addresses cannot be same.
     *         An address already belonging to a university account cannot also be used as the address for a new student.
     * @param _firstName is the first name of the new student.
     * @param _lastName is the last name of the new student.
     * @return Student object.
     */
    function registerStudent(
        string memory _firstName,
        string memory _lastName
    ) public returns (Student memory) {
        require(msg.sender != owner, "The contract owner cannot be a student.");
        require(
            universities[msg.sender].isActive == false,
            "Cannot create student, address already belongs to a university."
        );
        require(
            students[msg.sender].isActive == false,
            "Student is already registered."
        );

        studentAddresses.push(msg.sender);
        students[msg.sender] = Student(
            msg.sender,
            _firstName,
            _lastName,
            address(0),
            "",
            false,
            true
        );

        return (students[msg.sender]);
    }

    /**
     * Function 1(f) - Request to join a university.
     * @notice Only active students can request to join a university,
     *         so the contract account, and any university account cannot create a request to join a university.
     * @param _universityAddress is the address of the university which the student wants to join.
     * @return string success message.
     */
    function requestToJoinUniversity(
        address _universityAddress,
        bytes32 _programId
    ) public returns (string memory) {
        require(
            msg.sender != owner,
            "Contract owner cannot request to join a university."
        );
        require(
            universities[msg.sender].isActive == false,
            "University account cannot cannot request to join a university."
        );
        require(
            students[msg.sender].isActive == true,
            "Student inactive or does not exist."
        );
        require(
            students[msg.sender].universityAddress != _universityAddress,
            "Student is already enrolled in the given university."
        );
        require(
            programs[_programId].universityAddress == _universityAddress,
            "Program inactive or does not exist for given university."
        );

        students[msg.sender].universityAddress = _universityAddress;
        students[msg.sender].programId = _programId;

        return ("Request submitted successfully.");
    }

    /**
     * Function 1(g) - Accept a student in university.
     * @notice Only the requested university can accept a student.
     * @param _studentAddress is the address of the student who wants to join the university.
     * @return string success message.
     */
    function acceptStudent(
        address _studentAddress
    ) public returns (string memory) {
        require(
            universities[msg.sender].isActive == true,
            "University inactive or does not exist."
        );
        require(
            students[_studentAddress].isActive == true,
            "Student inactive or does not exist."
        );
        require(
            students[_studentAddress].universityAddress == msg.sender,
            "Student did not request to join university."
        );
        require(
            students[_studentAddress].universityAddress == msg.sender &&
                students[_studentAddress].isEnrolled == false,
            "Student is already enrolled in the university."
        );
        require(
            programs[students[_studentAddress].programId].universityAddress ==
                msg.sender,
            "Program does not belong to this university."
        );

        students[_studentAddress].isEnrolled = true;

        return ("Student accepted successfully.");
    }

    /**
     * Function 1(h) - Return a list of students enrolled in a university.
     * @param _universityAddress is the address of the university.
     * @return Student[]
     */
    function getStudentsForUniversity(
        address _universityAddress
    ) public view returns (Student[] memory) {
        require(
            universities[_universityAddress].isActive == true,
            "University inactive or does not exist."
        );
        Student[] memory response = new Student[](studentAddresses.length);
        for (uint256 i = 0; i < studentAddresses.length; i++) {
            Student memory student = students[studentAddresses[i]];
            if (student.universityAddress == _universityAddress) {
                response[i] = student;
            }
        }
        return response;
    }

    /**
     * Function 1(i) - Return details of student.
     * @return Student
     */
    function getStudent(
        address _studentAddress
    ) public view returns (Student memory) {
        require(
            students[_studentAddress].isActive == true,
            "Student inactive or does not exist."
        );
        return students[_studentAddress];
    }

    /**
     * Function 2(a) - A university issuing degrees to its students.
     * @notice Only a university account can issue a new degree.
     * @notice A university can only issue a degree for its own programs.
     * @notice Once degree is issued, student will be removed from the university and the program.
     * @param _studentAddress is the public address of the student to whom the degree belongs to.
     * @return IssuedDegree object.
     */
    function issueDegree(
        address _studentAddress
    ) public returns (IssuedDegree memory) {
        require(msg.sender != owner, "Contract owner cannot issue degree.");
        require(
            universities[msg.sender].isActive == true,
            "University inactive or does not exist."
        );
        require(
            students[_studentAddress].isActive == true,
            "Student inactive or does not exist."
        );
        require(
            students[_studentAddress].universityAddress == msg.sender,
            "The student does not belong to the university."
        );
        require(
            students[_studentAddress].isEnrolled == true,
            "The student is not yet accepted in the university."
        );

        bytes32 issuedDegreeId = keccak256(
            abi.encode(_studentAddress, students[_studentAddress].programId)
        );

        require(
            issuedDegrees[issuedDegreeId].issuedDegreeId != issuedDegreeId,
            "Degree is already issued for given studentAddress and programId."
        );

        issuedDegreeIds.push(issuedDegreeId);
        issuedDegrees[issuedDegreeId] = IssuedDegree(
            issuedDegreeId,
            _studentAddress,
            students[_studentAddress].firstName,
            students[_studentAddress].lastName,
            universities[students[_studentAddress].universityAddress].name,
            universities[students[_studentAddress].universityAddress].country,
            students[_studentAddress].programId,
            block.timestamp
        );

        students[_studentAddress].isEnrolled = false;
        students[_studentAddress].universityAddress = address(0);
        students[_studentAddress].programId = "";

        return (issuedDegrees[issuedDegreeId]);
    }

    /**
     * Function 2(b) - Return a list of degrees issued to a student.
     * @return IssuedDegree[]
     */
    function getIssuedDegreesForStudent(
        address _studentAddress
    ) public view returns (IssuedDegree[] memory) {
        IssuedDegree[] memory response = new IssuedDegree[](
            issuedDegreeIds.length
        );
        for (uint256 i = 0; i < issuedDegreeIds.length; i++) {
            IssuedDegree memory issuedDegree = issuedDegrees[
                issuedDegreeIds[i]
            ];
            if (issuedDegree.studentAddress == _studentAddress) {
                response[i] = issuedDegree;
            }
        }
        return response;
    }

    /**
     * Function 3 - A third party verifying the student's degree using the degree id.
     * @param _degreeId is the id of the degree issued to the student.
     * @return ValidationResponse object with degree, student, and university details to be presented to the verifier.
     */
    function validateDegree(
        bytes32 _degreeId
    ) public view returns (IssuedDegree memory) {
        return issuedDegrees[_degreeId];
    }
}
