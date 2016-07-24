
var penaltyText = undefined;
function loadPenaltyData()
{


    penaltyText = {
    biologyExperiments : ["Biology experiments overheating!", "Biology experiments lost", "Biology experiments saved!", biologyExperiments],
    spaceHamsters : ["Space Hamster's life support failing.", "Space Hamsters lost!", "Space Hamsters are safe!",spaceHamsters],
    rollJets : ["Roll Jets malfunctioning!", "Roll Jets non-functional!", "Roll Jets repaired!",rollJets],
    yawJets : ["Yaw Jets malfunctioning!", "Yaw Jet non-functional!", "Yaw Jets repaired!",yawJets],
    powerCapacitors : ["Power Capacitors overloading!", "Power Capacitors are overloaded!", "Power Capacitors re-routed!",powerCapacitors],
    aeronauticStabilizers : ["Stabilization system failing!", "Stabilizers have failed!", "Stabilizers fixed!",aeronauticStabilizers]
  }
}

var characterbackgrounds = ['Physicist', 'Pilot', 'Engineer', 'Physician', 'Teacher', 'Web Developer', 'Chemist', 'Business'];
var characterQuotes = ["“It was a texture. The blackness was so intense.”",
"“To infinity - and beyond!”",
"“Time is a flat circle”",
"“Welcome to Earth!”",
 "“Game over, man!",
 "I've got a bad feeling about this.”",
 "“Astronomy compels the soul to look upward, and leads us from this world to another.”",
 "“We need to have people up there who can communicate what it feels like, not just pilots and engineers.”",
"“I had the ambition to not only go farther than man had gone before, but to go as far as it was possible to go.”",
"“Following the light of the sun, we left the Old World.”",
"“I can't live the rest of my life talking about what I did in space for 11 days.”",
"“Just hold on, we're going home.”",
"“The stars look very different today.”"
 ];



var flagPictures = [
'Afghanistan-flag.png',
'Albania-flag.png',
'Algeria-flag.png',
'Andorra-flag.png',
'Angola-flag.png',
'Antigua-and-Barbuda.png',
'Argentina-flag.png',
'Armenia-flag.png',
'Australia-flag.png',
'Austria-flag.png',
'Azerbaijan-flag.png',
'Bahrain-flag.png',
'Bangladesh-flag.png',
'Barbados-flag.png',
'Belarus-flag.png',
'Belgium-flag.png',
'Belize-flag.png',
'Benin-flag.png',
'Bhutan-flag.png',
'Bolivia-flag.png',
'Bonaire-flag.png',
'Bosnian-flag.png',
'Botswana-flag.png',
'Brazil-flag.png',
'Brunei-flag.png',
'Bulgaria-flag.png',
'Cambodia-flag.png',
'Cameroon-flag.png',
'Canada-flag.png',
'Chad-flag.png',
'Chile-flag.png',
'China-flag.png',
'Colombia-flag.png',
'Congo-flag.png',
'Costa-rica-flag.png',
'Croatian-flag.png',
'Cuba-flag.png',
'Cyprus-flag.png',
'Czech-republic.png',
'Denmark.png',
'Dominican-republic-flag.png',
'East-timor.png',
'Ecuador-flag.png',
'Egypt-flag.png',
'El-Salvador-flag.png',
'England-flag.png',
'Eritrea-flag.png',
'Estonia.png',
'Ethiopia-flag.png',
'Fiji.png',
'Finland-flag.png',
'France-flag.png',
'Gabon-flag.png',
'Gambia-flag.png',
'Georgia-flag.png',
'Germany-flag.png',
'Ghana-flag.png',
'Greece-flag.png',
'Guatemala-flag.png',
'Haiti-flag.png',
'Honduras-flag.png',
'Hungary-flag.png',
'Iceland-flag.png',
'India-flag.png',
'Indonesia-flag.png',
'Iran-flag.png',
'Iraq-flag.png',
'Ireland-flag.png',
'Israel-flag.png',
'Italy-flag.png',
'Ivory-Coast-flag.png',
'Jamaica-flag.png',
'Japan-flag.png',
'Jordan-flag.png',
'Kazakhstan-flag.png',
'Kenya-flag.png',
'Korea-flag.png',
'Kuwait-flag.png',
'Kyrgyzstan-flag.png',
'Laos-flag.png',
'Latvia-flag.png',
'Lebanon-flag.png',
'Liberia-flag.png',
'Libya-flag.png',
'Macedonia-flag.png',
'Malawi-flag.png',
'Malaysia.png',
'Maldives-flag.png',
'Mali-flag.png',
'Malta-flag.png',
'Mexico-flag.png',
'Moldova-flag.png',
'Monaco-flag.png',
'Mongolia-flag.png',
'Montenegro.png',
'Montserrat-flag.png',
'Morocco-flag.png',
'Mozambique-flag.png',
'Myanmar.png',
'Netherlands-flag.png',
'New-zealand.png',
'Nicaragua-flag.png',
'Niger-flag.png',
'Nigeria-flag.png',
'North-Korea-flag.png',
'Northern-Ireland.png',
'Norway-flag.png',
'Oman-flag.png',
'Pakistan-flag.png',
'Palestine-flag.png',
'Panama-flag.png',
'Paraguay-flag.png',
'Peru-flag.png',
'Philippines-flag.png',
'Poland-flag.png',
'Portugal-flag.png',
'Puerto-Rico-flag.png',
'Qatar-flag.png',
'Romania-flag.png',
'Russia-flag.png',
'Saudi-Arabia-flag.png',
'Scotland.png',
'Senegal-flag.png',
'Serbia-flag.png',
'Sierra-leone-flag.png',
'Singapore-flag.png',
'Slovakia-flag.png',
'Slovenia-flag.png',
'Somalia-flag.png',
'South-africa-flag.png',
'Spain-flag.png',
'Sri-lanka-flag.png',
'Sudan-flag.png',
'Sweden-flag.png',
'Switzerland-flag.png',
'Syria-flag.png',
'Taiwan-flag.png',
'Tajikistan-flag.png',
'Tanzania-flag.png',
'Thailand-flag.png',
'Togo-flag.png',
'Trinidad-and-tobago.png',
'Tunisia-flag.png',
'Turkey-flag.png',
'Turkmenistan-flag.png',
'Uganda-flag.png',
'Ukraine-flag.png',
'United-Arab-Emirates.png',
'United-Kingdom-flag.png',
'United-States-flag.png',
'Uruguay-flag.png',
'Uzbekistan-flag.png',
'Venezuela-flag.png',
'Vietnam-flag.png',
'Wales.png',
'Yemen-flag.png',
'Zambia-flag.png',
'Zimbabwe-flag.png'
]
