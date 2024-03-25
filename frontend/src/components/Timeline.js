function Timeline({ minYear, maxYear, onYearChange }) {
    const [selectedYear, setSelectedYear] = useState(minYear);
  
    const handleChange = (event) => {
      setSelectedYear(event.target.value);
      onYearChange(event.target.value);
    };
  
    return (
      <div className="timeline">
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={selectedYear}
          onChange={handleChange}
        />
        <div>Selected Year: {selectedYear}</div>
      </div>
    );
  }