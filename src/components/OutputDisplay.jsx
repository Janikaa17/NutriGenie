function OutputDisplay({ output }) {
    return (
        <div className="p-6 border rounded bg-white shadow-sm">
            <h3 className="text-xl font-semibold text-[#638C6D] mb-2">Transformed Recipe</h3>
            <pre className="whitespace-pre-wrap text-gray-800 text-md">{output}</pre>
        </div>
    );
}

export default OutputDisplay;
