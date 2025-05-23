use pulldown_cmark::{Parser, Options, Event, TextMergeStream};
use std::fs::{self, read_to_string};
use std::env;
use std::fs::File;
use std::path::PathBuf;
use std::io::Write;
use std::path::Path;
fn main()->std::io::Result<()> {

    let directory: fs::ReadDir = fs::read_dir("./content").unwrap();
    let output_dir = Path::new("site");
    // fs::create_dir_all(output_dir)?;

    for file in directory {
        // println!("Name: {}", file.unwrap().path().display())
        // let entry = file.clone()?; // handle Result<DirEntry, Error>
        let path = file?.path();

        let contents = fs::read_to_string(&path).expect("expected file");

        
        let parser = pulldown_cmark::Parser::new(&contents);
        let mut html_output = String::new();
        pulldown_cmark::html::push_html(&mut html_output, parser);

        println!("{}", html_output);

        let file_stem = path.file_stem().unwrap();
        let mut new_filename = PathBuf::from(file_stem);
        new_filename.set_extension("html");

        let output_path = output_dir.join(new_filename);
        let mut html_file = File::create(output_path)?;

        write!(html_file, "{}", html_output)?;

        // let iterator = TextMergeStream::new(Parser::new(&contents));
        // for event in iterator {
        //     match event {
        //         Event::Text(text) => println!("{}", text),
        //         _ => {}
        //     }
        // }
    }

    // let markdown_input: &'static str = "Hello world, this is a ~~complicated~~ *very simple* example.";

    // let iterator: TextMergeStream<'_, Parser<'_>> = TextMergeStream::new(Parser::new(markdown_input));
    
    // for event in iterator {
    //     match event {
    //         Event::Text(text) => println!("{}", text),
    //         _ => {}
    //     }
    // }
    Ok(())


}
